import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import tzLookup from 'tz-lookup';

export const METHODS = ['Dubai', 'MuslimWorldLeague', 'Egyptian', 'Karachi', 'NorthAmerica'] as const;
export type Method = typeof METHODS[number];
export const PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export type PrayerName = typeof PRAYERS[number];
export interface SavedLocation {
  latitude: number;
  longitude: number;
  timeZone: string;
  source: 'device' | 'city';
  cityId?: string;
  updatedAt: number;
}
export interface PrayerConfig {
  version: 1;
  location: SavedLocation | null;
  method: Method;
  asr: 'standard' | 'hanafi';
}
export const DEFAULT_CONFIG: PrayerConfig = { version: 1, location: null, method: 'Dubai', asr: 'standard' };

// City-center coordinates: GeoNames, CC BY 4.0. See docs/PRAYER_TIMES.md.
export const CITIES = [
  { id: 'dubai', ar: 'دبي', en: 'Dubai', latitude: 25.077, longitude: 55.309 },
  { id: 'abu-dhabi', ar: 'أبوظبي', en: 'Abu Dhabi', latitude: 24.451, longitude: 54.397 },
  { id: 'sharjah', ar: 'الشارقة', en: 'Sharjah', latitude: 25.334, longitude: 55.412 },
  { id: 'al-ain', ar: 'العين', en: 'Al Ain', latitude: 24.192, longitude: 55.761 },
  { id: 'ajman', ar: 'عجمان', en: 'Ajman', latitude: 25.402, longitude: 55.479 },
  { id: 'ras-al-khaimah', ar: 'رأس الخيمة', en: 'Ras Al Khaimah', latitude: 25.790, longitude: 55.943 },
  { id: 'fujairah', ar: 'الفجيرة', en: 'Fujairah', latitude: 25.116, longitude: 56.341 },
] as const;

export function createLocation(latitude: number, longitude: number, source: SavedLocation['source'], cityId?: string): SavedLocation {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    throw new Error('Invalid coordinates');
  }
  return { latitude, longitude, timeZone: tzLookup(latitude, longitude), source, cityId, updatedAt: Date.now() };
}

export function parseConfig(raw: string | null): PrayerConfig {
  if (!raw) return { ...DEFAULT_CONFIG };
  try {
    const value = JSON.parse(raw);
    if (value.version !== 1 || !METHODS.includes(value.method) || !['standard', 'hanafi'].includes(value.asr)) throw new Error();
    if (value.location !== null) {
      const loc = value.location;
      if (!['device', 'city'].includes(loc.source) || !Number.isFinite(loc.updatedAt) || loc.updatedAt <= 0) throw new Error();
      const checked = createLocation(loc.latitude, loc.longitude, loc.source, loc.cityId);
      if (loc.timeZone !== checked.timeZone) throw new Error();
      if (loc.source === 'city') {
        const city = CITIES.find(c => c.id === loc.cityId);
        if (!city || city.latitude !== loc.latitude || city.longitude !== loc.longitude) throw new Error();
      }
    }
    return { version: 1, location: value.location, method: value.method, asr: value.asr };
  } catch { return { ...DEFAULT_CONFIG }; }
}

export function dayKey(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const get = (type: string) => parts.find(part => part.type === type)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export interface PrayerEntry { name: PrayerName; time: Date; }
export function calculateSchedule(config: PrayerConfig, dateKey: string) {
  if (!config.location) return null;
  const { latitude, longitude } = config.location;
  const [year, month, day] = dateKey.split('-').map(Number);
  const params = CalculationMethod[config.method]();
  params.madhab = config.asr === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  const coordinates = new Coordinates(latitude, longitude);
  // Adhan reads local calendar components, not an instant in the device zone.
  const today = new PrayerTimes(coordinates, new Date(year, month - 1, day), params);
  const tomorrow = new PrayerTimes(coordinates, new Date(year, month - 1, day + 1), params);
  const entries = (times: PrayerTimes): PrayerEntry[] => PRAYERS.map(name => ({ name, time: times[name] }));
  const todays = entries(today);
  const upcoming = [...todays, ...entries(tomorrow)];
  // Do not display partially invalid schedules in polar/no-solar-event conditions.
  if (upcoming.some(entry => !Number.isFinite(entry.time.getTime()))) return null;
  return { today: todays, upcoming };
}

export function nextPrayer(entries: PrayerEntry[], now: number) {
  return entries.find(entry => entry.time.getTime() > now) ?? null;
}

export function countdown(target: number, now: number): string {
  const seconds = Math.max(0, Math.ceil((target - now) / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
}

export function formatTime(time: Date, timeZone: string, language: 'ar' | 'en') {
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-AE' : 'en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(time);
}
