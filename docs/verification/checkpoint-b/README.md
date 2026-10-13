# Checkpoint B verification evidence

On-device screenshots captured from commit `2ef7f2e` (Android 14 emulator, Expo Go), evidencing Arabic RTL, English LTR, the 1.45x text size, and the language-switch restart flow.

| File | Shows |
| --- | --- |
| `02-en-ltr.png` | English LTR home; no restart banner (requested direction already applied). |
| `05-en-xlarge-settings.png` | Settings at Extra large (1.45x); long labels wrap, content scrolls. |
| `11-ar-switched.png` | Pending state after switching to Arabic: strings Arabic, layout still LTR, banner naming both directions. |
| `12-ar-after-reload.png` | After Restart now: layout mirrored to RTL, banner cleared. |
| `13-ar-settings.png` | Arabic RTL settings; labels on the trailing edge, check marks on the leading edge. |
