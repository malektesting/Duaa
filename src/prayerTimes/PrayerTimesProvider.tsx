import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { CITIES, DEFAULT_CONFIG, createLocation, parseConfig, type PrayerConfig } from './engine';

const STORAGE_KEY = 'salah.prayerTimes.v1';
type LocationError = 'denied' | 'locationError' | null;
interface PrayerContext {
  config: PrayerConfig; ready: boolean; locating: boolean; locationError: LocationError; storageError: boolean;
  update: (changes: Partial<Pick<PrayerConfig, 'method' | 'asr'>>) => void;
  selectCity: (id: string) => void; locate: () => Promise<void>; clear: () => void;
}
const Context = createContext<PrayerContext | null>(null);

export function PrayerTimesProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PrayerConfig>({ ...DEFAULT_CONFIG });
  const [ready, setReady] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<LocationError>(null);
  const [storageError, setStorageError] = useState(false);
  const requestId = useRef(0);
  // Serialize storage writes so a slower old write cannot restore a cleared location.
  const writes = useRef(Promise.resolve());

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(STORAGE_KEY).then(raw => { if (alive) setConfig(parseConfig(raw)); })
      .catch(() => { if (alive) setStorageError(true); })
      .finally(() => { if (alive) setReady(true); });
    return () => { alive = false; requestId.current++; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const serialized = JSON.stringify(config);
    writes.current = writes.current.then(() => config.location === null
      ? AsyncStorage.removeItem(STORAGE_KEY)
      : AsyncStorage.setItem(STORAGE_KEY, serialized)).then(() => setStorageError(false)).catch(() => setStorageError(true));
  }, [config, ready]);

  const cancelLocation = () => { requestId.current++; setLocating(false); setLocationError(null); };
  const selectCity = (id: string) => {
    const city = CITIES.find(item => item.id === id);
    if (!city) return;
    cancelLocation();
    setConfig(current => ({ ...current, location: createLocation(city.latitude, city.longitude, 'city', city.id) }));
  };
  const clear = () => { cancelLocation(); setConfig(current => ({ ...current, location: null })); };
  const locate = async () => {
    const id = ++requestId.current;
    setLocating(true); setLocationError(null);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (id !== requestId.current) return;
      if (permission.status !== 'granted') { setLocationError('denied'); return; }
      const position = await Promise.race([
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
        new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), 20000); }),
      ]);
      if (id !== requestId.current) return;
      if (position.coords.accuracy === null || position.coords.accuracy > 25000) throw new Error('low accuracy');
      const location = createLocation(position.coords.latitude, position.coords.longitude, 'device');
      setConfig(current => ({ ...current, location }));
    } catch { if (id === requestId.current) setLocationError('locationError'); }
    finally { if (timer) clearTimeout(timer); if (id === requestId.current) setLocating(false); }
  };
  return <Context.Provider value={{ config, ready, locating, locationError, storageError, selectCity, locate, clear,
    update: changes => setConfig(current => ({ ...current, ...changes })) }}>{children}</Context.Provider>;
}

export function usePrayerTimes() {
  const value = useContext(Context);
  if (!value) throw new Error('PrayerTimesProvider is required');
  return value;
}

/** Re-read the clock on foreground; never decrement a counter that can drift. */
export function usePrayerClock() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const resume = () => { setNow(Date.now()); interval = setInterval(() => setNow(Date.now()), 1000); };
    if (AppState.currentState === 'active') resume();
    const subscription = AppState.addEventListener('change', state => {
      if (interval) clearInterval(interval);
      if (state === 'active') resume();
    });
    return () => { if (interval) clearInterval(interval); subscription.remove(); };
  }, []);
  return now;
}
