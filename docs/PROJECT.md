# Light of Salah — project

## Purpose

Teach a Muslim how to pray, from sourced material and verified physical instruction. The app
transmits; it does not rule.

## Audience

13+, general Muslim audience. Plain language. Not a children's product.

## Scope

Offline-first app for web, iOS, and Android in Arabic and English. The current MVP has no
backend, accounts, or network dependency. Free, with no monetisation of any kind.

## Settled decisions

These are decided. Changing one requires a human decision and an ADR in `docs/DECISIONS.md`.

### D1 — Content verification
Human verifies every religious record against the D12 canonical source; agents may assist
with structure/permitted drafting only, never mark content verified or published.

### D2 — Content mode
PRIMARY_ONLY. Transmits sourced material + verified physical instruction. Issues no rulings.

### D3 — App name
AR "دليل المصلّي الميسّر", EN "Prayer Guide" (latest human decision, 2026-10-13).
UI and launcher names use these localized names. expo.name = "Prayer Guide".
slug = light-of-salah. bundle id / package = com.wadiai.lightofsalah.
Store name availability is not confirmed. See ADR-008.
Placeholder [APP_NAME] is CLOSED.

### D4 — Audience
13+, general Muslim audience, plain language, not a children's product.

### D5 — Business model
Free; no ads, subs, IAP, sponsorship, or monetization SDKs.

### D6 — Illustrations
Anonymous mannequin figure, no facial features. Never depict the Prophet ﷺ, Companions, or
any named historical figure.

### D7 — Platform
React Native + Expo + TypeScript, targeting web, iOS, and Android. Web layouts must remain
responsive from narrow mobile screens through desktop widths, with Arabic RTL and English LTR.

### D8 — Connectivity
Current MVP is fully offline-capable and has no backend, accounts, analytics, sync, or required
network access. Any later hosted backend or database is a separate implementation decision.

### D9 — Language
Arabic first, English second; RTL is a first-class requirement.

### D10 — Agent workflow
Codex implements, Claude Code reviews, human decides.

### D11 — Approved collections
Ṣaḥīḥ al-Bukhārī and Ṣaḥīḥ Muslim only, for now.

### D12 — Canonical editions
OPEN. Human must designate canonical source/edition/numbering per collection before Phase 3.
Does not block Phases 1–2.

## Open items

| Item | Status | Blocks |
| --- | --- | --- |
| D12 canonical editions | OPEN — awaiting human designation | Phase 3 |
