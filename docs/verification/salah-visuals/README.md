# Salah visual pass — implementation evidence

Captured on 2026-09-29 using Android 14, Expo Go, and the local AndroidEmulator AVD (1080 × 2400). These are actual app screenshots, not mockups. The floating gear is Expo Go's developer tools overlay, not app UI. Independent review and human acceptance remain pending.

## Checks completed

- `npm.cmd run typecheck` passes.
- Metro successfully bundles the Android app (1,386 modules on its initial bundle).
- Arabic RTL: Home → Overview → Guide → Source Details, Back to Guide, and Reading Preferences were exercised.
- Arabic extra-large: Settings, Guide content, source link wrapping, and scrolling were checked.
- English LTR: Home → Overview → Guide → Source Details and Reading Preferences were exercised at extra-large (1.45×) text size.
- Language changes displayed the pending-direction notice; the app restart applied RTL/LTR and cleared the notice.
- Full card/button bounds were inspected in Android's accessibility hierarchy. Main actions measured at least 56 dp high after fixing the Expo Router Slot/Pressable style merge issue.
- Text/background contrast examples range from 5.37:1 to 13.21:1; see the design system document.
- Religious content and physical instruction slots remain exactly `[بانتظار التحقق]`. There are no prayer steps, citations, or verified/published records.

## Screenshots

| Screen | Capture |
| --- | --- |
| Arabic Home | [Home](01-ar-home.png) |
| Arabic Overview | [Overview](02-ar-overview.png) |
| Arabic Guide | [Top](03-ar-guide.png), [lower content](04-ar-guide-lower.png) |
| Arabic Source Details | [Source](05-ar-source.png) |
| Arabic Settings | [Standard](06-ar-settings.png), [extra-large](07-ar-settings-xlarge.png) |
| Arabic Guide, extra-large | [Scrolled content and wrapping source link](08-ar-guide-xlarge.png) |
| Language restart notice | [English text with pending LTR](09-en-pending-restart.png) |
| English Home, extra-large | [Home](10-en-home-xlarge.png) |
| English Guide, extra-large | [Top](11-en-guide-xlarge.png), [lower content](12-en-guide-xlarge-lower.png) |
| English Source, extra-large | [Source](13-en-source-xlarge.png) |
| English Settings, extra-large | [Settings](14-en-settings-xlarge.png) |

## Limits and environment notes

No iOS, physical-device, release-build, screen-reader traversal, or combined OS-plus-app maximum font-scale verification was performed. The full native header title uses the platform header behavior rather than the app text-size setting. Screenshot edges may show the next scrollable section partially; the content was inspected by scrolling.

The initial headless emulator renderer produced black captures; software rendering resolved it. The first localhost preview had an IPv4 connectivity issue; a fresh Metro server on port 8082 loaded successfully after the first bundle completed. Expo's DevTools download used a fallback, and manifest icon resolution warned in the restricted environment. Screen icons and ornamentation are native geometry and rendered correctly. The known missing production scheme warning remains tracked separately as PRAYER-14; no dependencies or production configuration were changed.

Preferences were restored to Arabic and medium text after testing. No content or design was marked approved.
