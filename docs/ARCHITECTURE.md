# Architecture

What is built today: the app shell and the Salah screen visual pass.
It does not describe planned systems.

## Stack

React Native 0.86 on Expo SDK 57, TypeScript strict, Expo Router. Targets responsive web, iOS,
and Android (D7). The current MVP is offline-capable with no backend or required network calls
(D8). Static web export is suitable for later hosting; server/database integration remains a
separate phase.

## Layout

```
src/
  app/                     Expo Router routes (router root is src/app)
    _layout.tsx            Provider + hydration gate + Stack navigator
    index.tsx              Home
    settings.tsx           Language, text size, direction status
    salah/index.tsx        Salah overview placeholder and guide entry
    salah/guide.tsx        Instruction, illustration and text placeholders
    salah/source.tsx       Reference, original text and translation placeholders
  components/
    RestartBanner.tsx      Pending-direction notice, shown on every screen
    NavigationLink.tsx     Shared accessible navigation control
    FeatureLink.tsx        Full-card navigation with icon and mirrored chevron
    ScreenHeading.tsx      Localized screen introduction
    ContentNotice.tsx      Content preparation status
    PendingContent.tsx     Illustration, instruction and reading placeholders
  design/
    tokens.ts             Semantic colors, spacing, type, radius, layout and motion
    Screen.tsx            Scrollable bounded canvas
    Card.tsx              Shared surface primitive
    Ornament.tsx          Decorative arch geometry
    UiIcon.tsx            Native decorative UI icons
  localization/
    translations.ts        AR + EN catalogues, direction map, placeholder token
  preferences/
    AppPreferences.tsx     Context provider: state, persistence, direction
    textSize.ts            Persisted scale steps
```

## Routing

`expo-router/entry` is the app entry. `_layout.tsx` wraps everything in
`AppPreferencesProvider`, then renders `RootNavigator` inside it — the navigator has to be
inside the provider because the `Stack.Screen` titles come from the active catalogue.

`RootNavigator` renders an `ActivityIndicator` until preferences have hydrated, so the app
never flashes the default language before the stored one loads.

Routes: `index`, `settings`, `salah/index`, `salah/guide`, and `salah/source`.
Home links to the Salah overview, which opens the guide, which links to source details.
Home now offers Body purity, Wudu, Salah, and Duas cards, plus a settings icon.
The 2026-10-13 navigation revision adds two Body purity topics, four Wudu
sections, eight Salah sections (including five daily-prayer destinations),
and four Dua sections. Leaf content remains pending verification.
The earlier Salah guide/source/draft routes remain available by direct route.
Favorites is retained as a preparation route outside Home; no favorites storage exists yet.
Guide links to reading preferences,
and Source links back to Guide. Native Pressables call `router.navigate` for these actions.
The native Stack header supplies back navigation. These are empty screen structures, not
a prayer sequence: there are no step counts, physical instructions, illustrations, religious
texts, or source citations. All religious content slots render the approved placeholder.
Canonical source selection and human content verification remain outstanding.

Implementation checks and Android emulator evidence are recorded in
`docs/verification/salah-visuals/README.md`. Independent review remains pending.

## Localization

`translations.ts` holds one typed `Translation` catalogue per language (`ar`, `en`). Screens
hold no inline copy — every user-facing string resolves through `useAppPreferences().t`.

The file also exports `LANGUAGE_DIRECTION` (`ar` → `rtl`, `en` → `ltr`) and
`PENDING_VERIFICATION`, the approved placeholder `[بانتظار التحقق]`. No religious content
exists in the codebase; every Salah content slot renders that placeholder. Home has
navigation, app descriptions, and a preparation notice rather than a religious content slot.

Language resolution on first launch: stored preference, else device locale via
`expo-localization` `getLocales()` if it is `ar` or `en`, else `ar` (Arabic-first, D9).

## Layout direction and the restart model

On native platforms, React Native resolves layout direction when the JS bundle starts.
`I18nManager.forceRTL()` writes the desired direction to native storage but does not restyle
the running app. Only a reload applies it. On web, the root view and document `dir`/`lang`
attributes follow the selected language immediately; web never calls `forceRTL`.

Two consequences shape the design:

**The native applied direction is snapshotted at module load.** `I18nManager.isRTL` can report the
newly *requested* value immediately after a `forceRTL` call, so it is not a safe read of what
is on screen. `AppPreferences.tsx` captures it once at module scope, before anything can call
`forceRTL`:

```ts
const APPLIED_DIRECTION: LayoutDirection = I18nManager.isRTL ? 'rtl' : 'ltr';
```

That constant is the native value treated as "what is rendered". On web, the requested value
is applied directly to the root view and document.

**Restart-required is derived, not stored.**

```ts
isRestartRequired: isHydrated && LANGUAGE_DIRECTION[language] !== APPLIED_DIRECTION
```

When it is true, `RestartBanner` appears on every screen, naming the applied direction and the
pending direction explicitly. Under a dev client it offers `DevSettings.reload()`; otherwise
it instructs the user to close and reopen the app. The mismatch is never left silent.

Because `ar` and `en` always differ in direction, every language switch goes through this
path. Verified on device in both directions — see `docs/verification/checkpoint-b/`.

Layout uses direction-aware properties only: `start`/`end`, and `flexDirection: 'row'` (which
React Native reverses under RTL). No `left`/`right`.

`app.json` enables the `expo-localization` config plugin with `supportsRTL: true` so native
builds honour `forceRTL`, and `supportedLocales: ["ar", "en"]`. Plugin config applies to
prebuilt native projects; Expo Go ignores it.

## Text size

`textSize.ts` defines four steps — `small` 0.9, `medium` 1.0, `large` 1.2, `xlarge` 1.45 —
over the type ramp in `src/design/tokens.ts` (`display` 34, `title` 28, `heading` 20, `body` 16,
`label` 14). Screens use `scaledType(role, scale)` for font size and line height.

All screens use the scrollable `Screen` primitive so the largest step scrolls rather than
clipping. `Card` and the color/spacing tokens are documented in `DESIGN_SYSTEM.md`.

## Persistence

AsyncStorage preferences:

| Key | Value |
| --- | --- |
| `salah.pref.language` | `ar` \| `en` |
| `salah.pref.textSize` | `small` \| `medium` \| `large` \| `xlarge` |
| `salah.prayerTimes.v1` | Chosen coordinates/zone/source/timestamp and calculation settings; removable in prayer settings |

No analytics, progress, or location history are persisted (D5, D8). Writes happen in
effects keyed on the value rather than inside state updaters, so a double-invoked updater
under StrictMode cannot fire `forceRTL` or a write twice. A storage failure degrades to a
session-only preference instead of crashing.

## Dependencies

Beyond the Expo template: `expo-localization` (device locale, RTL config plugin) and
`@react-native-async-storage/async-storage` (local preferences). The prayer banner adds
`expo-location` (foreground request only), `adhan` (offline calculations), and
`tz-lookup` (offline approximate IANA zone lookup). See `PRAYER_TIMES.md` for accuracy
boundaries and source attribution. `PrayerTimesProvider` wraps the navigator;
`/prayer-settings` is reached from the Home banner. GPS is never requested on launch.

## App identity

`app.json` matches D3:

| Field | Value |
| --- | --- |
| `expo.name` | Prayer Guide |
| `expo.slug` | light-of-salah |
| `ios.bundleIdentifier` | com.wadiai.lightofsalah |
| `android.package` | com.wadiai.lightofsalah |

Launcher names are localized through `expo.locales`, which generates
`CFBundleDisplayName` on iOS and the `app_name` string resource on Android — the label shown
under the icon, not the store listing:

| Locale | Launcher name |
| --- | --- |
| `locales/ar.json` | دليل المصلّي الميسّر |
| `locales/en.json` | Prayer Guide |

The long per-locale store names in D3 are store listing metadata. They are entered in App
Store Connect and Play Console at submission and are deliberately not represented in this
repository.

## Known divergences

None outstanding.
