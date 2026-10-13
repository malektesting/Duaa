# Prayer banner verification — 2026-10-11

Status: implemented prototype, awaiting independent review and human acceptance.

- TypeScript check passed; all 10 prayer engine tests passed.
- Android Expo Go: initial location setup, permission denial with manual fallback,
  Dubai selection, daily times, and live countdown checked.
- `01-ar-dubai.png` shows the final compact Arabic banner with Dubai selected
  explicitly for testing. The floating gear is an Expo development overlay.
- Optional device-location request timed out in the emulator after permission
  was granted and synthetic coordinates were supplied. The error appeared and
  the previously selected city remained usable. Successful GPS acquisition is
  not verified; physical Android and iOS checks remain outstanding.
- `02-ar-device-location.png` was captured while acquisition was pending; it
  does not demonstrate successful device-location acquisition.
- Follow-up: disabled Expo Go's Settings > Developer Menu > Tools button. This
  floating developer control caused the reported overlap with the Home title;
  it was not the app's Settings control. No app layout workaround was needed.
- Confirmed saved Dubai selection survives force-stop/relaunch. Confirmed Arabic
  and English extra-large banner layouts on the Android emulator: daily times
  wrap and the countdown remains readable. Evidence: `03-ar-clean.png`,
  `04-ar-xlarge.png`, and `05-en-xlarge.png`.
- Returned preview preferences to Arabic with medium text. Physical-device GPS
  success and iOS validation remain outstanding.

See ../../PRAYER_TIMES.md for calculation sources and the unresolved 2–3 minute
Asr difference against the sampled official Dubai timetable. No official
accuracy, religious verification, or release approval is claimed.
