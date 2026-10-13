# Movement illustrations — draft review

## Human request and boundary

On 2026-09-29 the human requested Salah movement visuals, from the opening takbir to salam, to review later. This authorizes producing illustration drafts for review. It does not verify any religious content, choose a canonical edition under D12, approve a prayer sequence, or authorize publication.

The development-only `salah/steps` screen presents ten review frames from a nine-cell atlas, reusing the floor-contact drawing for the second occurrence. This is a drawing catalogue ordered for review, NOT an executable prayer sequence. Repetition counts, intermediate transitions, prayer selection, and position variants remain unspecified. The regular Guide keeps its approved placeholder. A release build visiting the draft route renders the placeholder instead of the drawings, and the Guide's preview link is hidden.

Every frame shows `[بانتظار التحقق]`. There are no religious captions, recitations, hadith quotations, or human verification flags in the viewer. The screen title reflects the endpoints explicitly requested by the user. Interface numbering identifies images, not prescribed steps.

## Deliverables

- Atlas: `assets/illustrations/salah-draft/pose-atlas.png`, 1254 × 1254, opaque RGB.
- Generation method: built-in `image_gen`, followed by one corrective image edit. See [exact prompts](PROMPTS.md).
- Original generated outputs remain in the Codex generated-images directory. The final project asset is copied into this repository and requires no network at runtime.
- `PoseDraftImage` clips a square viewport from the atlas at render time. Artwork is never mirrored for Arabic RTL; anatomical left/right must not change with the UI language.
- The viewer has Previous/Next, selectable thumbnails, current-image status, and disabled controls at the ends. Selection is session-only and is not persisted.

## Review inventory

These descriptions identify artwork for review; they are not approved instruction.

| Review image | Atlas cell (row, column; zero-based) | Drawing to inspect |
| --- | --- | --- |
| 1 | 0, 0 | Opening hand raise |
| 2 | 0, 1 | Standing with folded arms |
| 3 | 0, 2 | Side-view bow |
| 4 | 1, 0 | Upright return |
| 5 | 1, 1 | Floor-contact pose |
| 6 | 1, 2 | Seated pose |
| 7 | 1, 1 | Same floor-contact drawing, reused |
| 8 | 2, 0 | Final seated pose |
| 9 | 2, 1 | First head-turn draft |
| 10 | 2, 2 | Second head-turn draft |

The current character wears a white ankle-length Arabic thobe and has short dark hair, per the human's 2026-09-30 revision request. The face remains featureless. The earlier Wudu reference already uses white clothing and dark hair; it was inspected for consistency, not modified. The hands, feet, head rotation, contact points, and seated leg placement require human inspection. Clothing occludes some joints, and a faceless head makes its direction less explicit. These limitations must not be mistaken for verified physical instruction. No pose is marked correct or preferred over another practice.

## Research leads, not canonical approval

The following primary-text pages were consulted as research leads for the draft. Their web reference labels have been looked up rather than invented, but neither their editions nor their numbering have been accepted under D12. They are not added to the app's religious content database or displayed as approved sources:

- [Sahih al-Bukhari 828 on Sunnah.com](https://sunnah.com/bukhari:828)
- [Sahih al-Bukhari 740 on Sunnah.com](https://sunnah.com/bukhari:740)
- [Sahih Muslim 582 on Sunnah.com](https://sunnah.com/muslim:582)

Source lookup is not human verification. Canonical selection, religious review, and publication remain pending.

## Implementation verification

TypeScript checking passed when the viewer was added. Android Expo Go captures show the opening, bowing, and floor-contact crops in Arabic RTL. Next navigation through frame five and matching selected thumbnails were exercised; Previous was disabled on frame one. Further native checks were interrupted when automatic approval review could not complete because of a usage limit. End-of-list navigation and English/native checks for this new viewer remain unverified.

The Android production export succeeded after guarding the atlas require with `__DEV__`; its asset list omitted the draft atlas. The release route renders a placeholder and the preview link is hidden.

The 2026-09-30 clothing/hair revision preserves the atlas's 1254 × 1254 opaque RGB format and cell registration. The revised atlas was visually inspected. Existing native screenshots depict the superseded olive outfit, not the current asset. See [revision prompt and provenance](PROMPTS.md).
