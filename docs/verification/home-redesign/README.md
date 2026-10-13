# Home redesign — 2026-10-10

Implemented the human-approved names and Home layout: no large banner; Wudu,
Salah, Duas, Favorites cards in order; settings icon in the heading. Existing
uncommitted work was preserved with explicit user authorization.

Validation: TypeScript and diff whitespace checks passed. Android Expo Go showed
Arabic RTL at medium and extra-large text, and English LTR at extra-large text.
All four Home cards and Settings opened their intended destinations, with back
navigation returning to Home. Screenshots are in this directory.

Wudu, Duas, Favorites are preparation screens only. Favorites saving is not yet
implemented. No religious material was added or marked verified. Inner pages
remain for subsequent user-directed checkpoints. iOS, physical devices, combined
OS font scaling, store name availability, and independent review remain pending.

Expo's existing missing production scheme warning was dismissed for screenshots.
The floating Tools gear is Expo Go development UI, not the app Settings button.
Preview ran on IPv4 localhost using node --dns-result-order=ipv4first and ADB
reverse on port 8084; LAN mode was rejected by automatic approval review and was
not used.
