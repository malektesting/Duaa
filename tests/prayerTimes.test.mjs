import test from 'node:test';
import assert from 'node:assert/strict';
import { CITIES, DEFAULT_CONFIG, calculateSchedule, countdown, createLocation, dayKey, formatTime, nextPrayer, parseConfig } from '../src/prayerTimes/engine.ts';

const dubai = { ...DEFAULT_CONFIG, location: createLocation(25.077, 55.309, 'city', 'dubai') };
test('no location never produces a fabricated timetable', () => {
  assert.equal(calculateSchedule(DEFAULT_CONFIG, '2026-10-10'), null);
});
test('UAE city coordinates resolve to Asia/Dubai offline', () => {
  for (const city of CITIES) assert.equal(createLocation(city.latitude, city.longitude, 'city', city.id).timeZone, 'Asia/Dubai');
});
test('uses selected-location calendar date across UTC midnight and year rollover', () => {
  assert.equal(dayKey(new Date('2026-12-31T21:00:00Z'), 'Asia/Dubai'), '2027-01-01');
  assert.equal(dayKey(new Date('2026-12-31T21:00:00Z'), 'America/New_York'), '2026-12-31');
});
test('all five prayers ordered and sunrise is not a next-prayer candidate', () => {
  const result = calculateSchedule(dubai, '2026-10-10');
  assert.deepEqual(result.today.map(p => p.name), ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']);
  for (let i = 1; i < result.upcoming.length; i++) assert.ok(result.upcoming[i].time > result.upcoming[i - 1].time);
  assert.equal(nextPrayer(result.upcoming, result.today[0].time.getTime()).name, 'dhuhr');
});
test('after Isha advances to tomorrow Fajr, including year-end', () => {
  const result = calculateSchedule(dubai, '2026-12-31');
  const next = nextPrayer(result.upcoming, result.today[4].time.getTime());
  assert.equal(next.name, 'fajr');
  assert.equal(dayKey(next.time, 'Asia/Dubai'), '2027-01-01');
});
test('countdown uses current absolute clock and clamps at zero', () => {
  assert.equal(countdown(3661000, 0), '01:01:01');
  assert.equal(countdown(3661000, 3600000), '00:01:01');
  assert.equal(countdown(1000, 2000), '00:00:00');
});
test('formats DST using the selected location, never the device offset', () => {
  assert.equal(formatTime(new Date('2026-03-08T06:30:00Z'), 'America/New_York', 'en'), '01:30');
  assert.equal(formatTime(new Date('2026-03-08T07:30:00Z'), 'America/New_York', 'en'), '03:30');
});
test('invalid/corrupt storage is rejected while valid preferences round trip', () => {
  assert.deepEqual(parseConfig(JSON.stringify(dubai)), dubai);
  for (const raw of ['no json', 'null', '{}', JSON.stringify({ ...dubai, method: 'unknown' }), JSON.stringify({ ...dubai, location: { ...dubai.location, latitude: 200 } }), JSON.stringify({ ...dubai, location: { ...dubai.location, timeZone: 'America/New_York' } })]) {
    assert.equal(parseConfig(raw).location, null);
  }
  assert.throws(() => createLocation(NaN, 55, 'device'));
});
test('Asr choice changes Asr time without altering Fajr', () => {
  const standard = calculateSchedule(dubai, '2026-10-10');
  const hanafi = calculateSchedule({ ...dubai, asr: 'hanafi' }, '2026-10-10');
  assert.ok(hanafi.today[2].time > standard.today[2].time);
  assert.equal(hanafi.today[0].time.getTime(), standard.today[0].time.getTime());
});
test('uncomputable polar schedules fail closed', () => {
  const polar = { ...dubai, location: createLocation(89, 0, 'device') };
  assert.equal(calculateSchedule(polar, '2026-06-21'), null);
});
