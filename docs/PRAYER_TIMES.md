# Offline prayer-times prototype

Requested by Malek: a next-prayer/countdown banner above the four Home options,
with optional device location and manual city selection; validate UAE first.

## Implementation

- `src/prayerTimes/engine.ts`: Adhan calculation, explicit IANA timezone, five
  prayers (sunrise is not a next-prayer target), today/tomorrow rollover.
- `PrayerTimesProvider.tsx`: opt-in foreground location, timeout, saved local
  settings, invalid storage fallback, foreground clock refresh. No background
  location, reverse geocoding, coordinate upload, or runtime prayer-time API.
- `PrayerTimesBanner.tsx`: location setup, next prayer, absolute-clock countdown,
  daily times, calculation disclosure, stale saved-device-location reminder.
- `prayer-settings.tsx`: seven UAE city centers; method and Asr calculation
  selection; clear saved location. City selection is not GPS precision.

The initial method is Adhan's Dubai preset with standard Asr. This is a
calculation preset, NOT an official UAE timetable or human approval. No location
is inferred from language, device zone, or the user's country statement. GPS
queries occur only after a button press. Selecting a city or clearing the saved
location invalidates any in-flight GPS result.

## Sources and boundaries

- Adhan JS 4.4.6 (MIT): https://github.com/batoulapps/adhan-js
- Method documentation: https://github.com/batoulapps/adhan-js/blob/develop/METHODS.md
- Expo SDK 57 location: https://docs.expo.dev/versions/v57.0.0/sdk/location/
- City coordinates, rounded as published, GeoNames (CC BY 4.0):
  https://www.geonames.org/AE/largest-cities-in-united-arab-emirates.html
- tz-lookup 6.1.25 (CC0): bundled approximate zone boundaries, last database
  update documented as 2019. UAE city zones are tested; errors near zone borders
  and broader geographic coverage remain limitations. The selected zone is shown.
- Dubai reference: IACAD Ramadan 2026 timetable, page 11:
  https://iacad.gov.ae/assets/b4d53ecb/ramadan-in-dubai-2026-ad-1447-ah.aspx

On 2026-02-24 and 2026-03-01, the Dubai city-center calculation matches the
reference's Fajr, Dhuhr, Maghrib, Isha to the minute, but Asr is 3 and 2 minutes
later, respectively. No undocumented correction was applied. These sample
comparisons are engineering evidence only, not human verification or a guarantee
for other dates/locations. Official-timetable alignment remains unresolved.

The banner explicitly identifies calculated times. No mosque Iqamah, Jumu'ah,
weather, notifications, audio Adhan, or Hijri dates are inferred from the sample
image or included. Inner content screens are unchanged.

## Checks

`npm run typecheck` and `node --test tests/prayerTimes.test.mjs` pass (10 tests):
missing location, UAE zones, selected-zone date, prayer ordering, after-Isha and
year rollover, countdown clamping, DST, corrupt preferences, Asr selection,
and uncomputable polar days. Native visual/location checks are recorded separately.

Production release requires independent review, physical-device/iOS permission
checks, human acceptance of the method and its differences, and broader location
validation. This document does not mark religious content verified or published.
