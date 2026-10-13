# Architecture decision records

## ADR-010 — Add responsive web as a first-class platform

**Status:** Decided by Malek, 2026-10-13.

**Decision:** Extend the Expo application to target responsive web alongside iOS and Android.
Web must support narrow mobile viewports and desktop widths, Arabic RTL and English LTR, and
remain usable without a backend. Update D7 to match.

**Boundary:** This changes the platform scope only. The current MVP remains offline-capable
under D8; Replit hosting and any server/database work belong to a later delivery step and do
not authorize adding network dependencies in this checkpoint.

## ADR-011 — Set the English display name to Prayer Guide

**Status:** Decided by Malek, 2026-10-13.

**Decision:** Use "Prayer Guide" as the English UI, launcher, and Expo display name, replacing
the English display name in ADR-008. Keep the Arabic name and technical identifiers unchanged.

## ADR-009 — Optional location and offline prayer-time banner

**Status:** Feature and offline approach requested by Malek on 2026-10-10;
calculation accuracy and final presentation remain under review.

**Decision:** Extend Home with next-prayer countdown and daily calculated times.
Allow optional foreground device location or manual city selection. Persist only
the chosen location, timezone, update timestamp, and calculation settings locally.
This extends ADR-004's persistence scope for this explicitly requested feature.
D8's offline/no-backend policy remains in force; do not transmit coordinates.

**Boundary:** UAE-first validation. Calculation presets are not official timetables.
Human acceptance and independent review remain outstanding. See PRAYER_TIMES.md.

## ADR-008 — New display names and four-section Home

**Status:** Decided by Malek, 2026-10-10; implementation awaiting review.

**Decision:** Supersede ADR-005's display names with Arabic "دليل المصلّي الميسّر"
and English "Simple Prayer Guide". Keep existing technical identifiers. Remove the
Home banner and show Wudu, Salah, Duas, Favorites in that order, with a settings icon
at the top. Malek authorized continuing over the existing uncommitted changes.

**Scope:** Home only. Salah opens the existing overview. The other destinations
are preparation screens until their individual checkpoints; favorites storage is
not implemented. No religious content is added or approved. Store availability
has not been established for the new names.

Lightweight ADRs. One decision per record. Superseding a record requires a new record, not an
edit to the old one.

## ADR-001 — React Native + Expo

**Status:** Accepted

**Decision:** Build the app with React Native and Expo (SDK 57) in TypeScript, originally
targeting iOS and Android. Web was out of scope at the time; ADR-010 supersedes that platform
limit and adds web.

**Reason:** One codebase for both platforms, with managed native configuration. Expo's config
plugins cover the native settings this app needs — notably RTL support — without maintaining
native projects by hand. Matches D7.

## ADR-002 — Expo Router for navigation

**Status:** Accepted

**Decision:** Use Expo Router, with the route tree in `src/app`.

**Reason:** File-based routing keeps the navigation surface small and obvious in a shell this
size, and it ships with Expo rather than adding a dependency. Screen titles resolve from the
localization catalogue at render, so routes localize without a parallel configuration.

## ADR-003 — RTL via I18nManager, with an honest restart flow

**Status:** Accepted

**Decision:** Drive layout direction through `I18nManager.allowRTL` / `forceRTL`. Treat the
direction snapshotted at module load as the applied direction, derive a restart-required
state when the selected language disagrees with it, and surface that state to the user on
every screen. Do not assume web CSS direction semantics.

**Reason:** React Native resolves direction natively at bundle start; `forceRTL` does not
restyle a running app. A design that pretends otherwise produces a half-applied layout —
Arabic text in an LTR frame — with no explanation. Naming both directions and offering a
restart is the only honest representation of what the platform actually does. Verified on
device in both directions (`docs/verification/checkpoint-b/`).

## ADR-004 — Local persistence via AsyncStorage, tightly scoped

**Status:** Accepted

**Decision:** Persist preferences with AsyncStorage, restricted to selected language,
selected text size, and necessary accessibility preferences. Nothing else.

**Reason:** The app is fully offline with no accounts (D8) and collects nothing about the
user (D5). AsyncStorage is sufficient for a handful of keys and needs no schema or migration
layer. Keeping the allowed set explicit makes any future addition a visible decision rather
than a drift.

## ADR-005 — App name closed; [APP_NAME] placeholder retired

**Status:** Accepted

**Decision:** Adopt the D3 naming scheme. The `[APP_NAME]` placeholder is closed and must not
appear in code, docs, or copy.

**Reason:** Naming was blocking store-facing configuration and copy. D3 settles store name,
launcher name, `expo.name`, slug, and bundle identifier, so the placeholder has no remaining
use. See the divergence note in `docs/ARCHITECTURE.md` — the decision is settled, the config
is not yet aligned.

## ADR-006 — Defer `scheme` configuration

**Status:** Accepted (deferred — PRAYER-14)

**Decision:** Do not set `expo.scheme` during Phase 1a. Accept the development-time Linking
warning it produces.

**Reason:** The warning is emitted by Expo Router's `Link` and is harmless in Expo Go. A
scheme matters for production builds and deep linking, neither of which exists yet. Tracked
as PRAYER-14 and to be set before the first production build.

## ADR-007 — Defer production reload capability

**Status:** Accepted (deferred — PRAYER-15)

**Decision:** Do not add `expo-updates` during Phase 1a. The restart button uses
`DevSettings.reload()` under a dev client; production builds instruct the user to close and
reopen the app.

**Reason:** `DevSettings.reload()` is development-only, so a production restart button needs
`expo-updates` and its OTA configuration — infrastructure well outside a Phase 1a shell. The
manual instruction is honest and correct in the meantime. Tracked as PRAYER-15 and to be
revisited when release builds begin.
