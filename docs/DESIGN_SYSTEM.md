# Design system — Salah visual pass

The app shell uses warm ivory, deep olive, and restrained gold. The Salah screens are visual scaffolds awaiting human review; religious text, references, translations, and physical instructions remain exactly `[بانتظار التحقق]`. The arch is abstract decoration, not a prayer illustration.

## Tokens

`src/design/tokens.ts` is the source of truth. The original canvas, surface, ink, and olive colors remain. Forest (`#243F35`) anchors the Home and Overview covers and reading panels; pale sage separates the illustration placeholder; sand marks content awaiting preparation. Gold is decorative, never the only indication of state.

Spacing uses 4/8/12/16/20/24/32/40 pt. Controls have 14 pt corners, cards 22 pt, and covers 28 pt. The canvas is capped at 720 pt with responsive 20 pt outer padding plus safe-area allowances. This keeps reading widths comfortable on desktop while the 100% canvas and wrapping controls fit narrow phones. Buttons have a 56 pt minimum height; Settings options retain at least 48 pt. Text containers grow and screens scroll. No network imagery, downloaded fonts, or animations are used.

The medium type ramp is display 34, title 28, heading 20, body 16, and label 14 pt with 1.5 line height. Existing app text-size steps and OS font scaling remain enabled. These are system UI fonts; no scripture typography has been selected.

## Components

- `Screen`: scrollable, width-bounded content with bottom and horizontal safe-area padding.
- `ScreenHeading`: optional eyebrow, heading, and description from the localization catalogue.
- `NavigationLink`: primary, secondary, and light buttons with pressed feedback and link semantics.
- `FeatureLink`: a full-card navigation target with a decorative native icon, wrapping text, and direction-aware chevron.
- `PendingContent`: plain instruction/reference, pale illustration, and dark reading variants. All religious slots display the same exact placeholder.
- `ContentNotice`: preparation status with a decorative gold edge and explicit text.
- `Ornament` and `UiIcon`: native geometry, hidden from accessibility services.

Navigation uses `router.navigate` from native Pressables. The installed Expo Router Slot implementation merges styles as objects, which discards a Pressable style callback when passed directly through `Link asChild`; keeping Pressable in control preserves its dimensions and pressed state. Native Stack headers provide Back navigation.

Home includes the cover, Guide and Source shortcuts, preparation notice, and reading preferences. Overview introduces the guide. Guide separates illustration, instruction, and reading panels. Source Details groups the reference, original text, and translation placeholders. Settings shares the updated typography and surfaces; direction diagnostics remain there rather than on Home.

## Direction and accessibility

Layout follows the existing applied-direction/restart model. Rows and start/end borders mirror under RTL. No content text has a fixed height or line limit. Section titles have heading semantics, controls have link/radio semantics, and selected Settings options retain text, color, and a check mark. Decorative elements are hidden from accessibility services.

Calculated text contrast examples: ink/surface 13.21:1, muted ink/canvas 6.01:1, muted ink/sand 5.37:1, pale ink/forest 9.19:1, white/olive 7.31:1. These checks do not replace a full accessibility audit.

## Verification

See `verification/salah-visuals/README.md` for this pass's device evidence and limitations. The older `verification/checkpoint-1b/` captures describe the previous shell. No content has been marked verified or published, and independent review remains pending.

## Home revision — 2026-10-10

Home uses a compact localized brand heading and a 48-point settings icon button,
followed by four full-width cards: Wudu, Salah, Duas, Favorites. The large ornament
banner and direct source shortcut have been removed from Home. Cards use the
existing FeatureLink treatment without descriptions, retaining scalable labels,
mirrored chevrons, and native navigation. Inner section design is deferred.
