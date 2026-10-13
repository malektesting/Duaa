# Generated asset prompts

## White Arabic thobe and hair revision — 2026-09-30

At the human's request, the selected atlas was edited with built-in `image_gen` to replace the olive tunic/trousers with an ankle-length white Arabic thobe and add short dark hair. Faces remain featureless. The same 3×3 registration and 1254 × 1254 opaque RGB dimensions are retained, so the existing crop coordinates and ten-frame viewer still apply. The earlier Wudu board at `C:/Users/malek/OneDrive/Documents/ChatGPT/Salah App/phase-2/assets/design-previews/wudu-detail-board.png` already uses white clothing and dark hair and was inspected as the character-design reference. It was not modified.

The app now loads the revised artwork from `assets/illustrations/salah-draft/pose-atlas.png`. Native screenshots `01-ar-opening.png`, `02-ar-bowing.png`, and `03-ar-prostration.png` show the superseded olive outfit and are historical UI evidence only. The revised atlas was visually inspected; no new native screenshot is claimed for this clothing-only change.

### Exact revision prompt

```text
Edit the supplied 3-by-3 Salah pose illustration atlas. Change ONLY the character's clothing and hair.
Replace the olive tunic-and-trouser outfit in ALL NINE cells with a WHITE ARABIC THOBE: a single continuous loose ankle-length white robe, long sleeves with neat cuffs, simple small stand collar and discreet short front button placket, straight flowing Gulf/Arabian thobe silhouette. The hem falls to the ankles while standing. This must look like an Arabic thobe, NOT a knee-length kurta or shalwar kameez, NOT a long shirt over visible loose trousers. In kneeling, bowing and prostration poses the white robe drapes naturally across the legs and joints, with enough cloth volume to accommodate the unchanged poses. Bare feet remain visible where they were visible. Use subtle neutral-gray folds and contour shading so the white robe is clearly visible against the warm ivory background, but keep the robe truly white.
Add the SAME neat short dark brown-black hair to ALL NINE heads: natural short textured hair on top, tidy short sides and back, recognizable hairline. No cap, scarf, ghutra, head covering, beard or moustache. Keep the faces blank and featureless, no eyes/nose/mouth. Preserve adult proportions, skin tone, head directions, anatomy, exact hand and foot placements, pose silhouettes apart from the needed robe drape, and soft refined 3D illustration style.
CRITICAL: preserve the EXACT 3x3 equal square atlas registration and the original nine pose order. Keep each figure fully inside its existing cell; do not shift or resize individual cells. Preserve the background as fully opaque warm ivory, soft floor shadows, and overall framing. Do not add words, numbers, borders, grid lines, symbols or extra figures. This is an unapproved illustration draft for visual review. Do not change religious movement details.
```


Built-in `image_gen` was used. The first atlas was discarded because of background artifacts and an insufficiently horizontal bowing pose. The selected second version is stored in `assets/illustrations/salah-draft/pose-atlas.png` (1254 × 1254, RGB).

## Initial atlas prompt

```text
Use case: scientific-educational.
Asset type: ONE square 3-by-3 illustration atlas for an Arabic-first mobile app, Light of Salah. This is an unapproved visual draft for human review, NOT a depiction of any historical or religious individual.
Create exactly 9 equal square cells in a perfectly regular 3-column x 3-row grid, edge to edge with NO gutters, NO dividing rules, NO labels, NO numbers, NO lettering, NO watermark. Every cell has an identical flat warm ivory background #F8F5ED. Each full figure and its soft floor shadow fit completely inside its own cell with at least 12% clear margin. Consistent adult proportions and camera scale.
Subject in every cell: the SAME anonymous adult anatomical mannequin, smooth blank oval head with no facial features whatsoever, no hair, beard, eyes, nose, mouth, or headwear. Matte sand-colored head, hands and bare feet; modest loose long-sleeved olive tunic extending to knees, loose olive trousers. Clothing stays modest in every pose. Soft premium 3D educational illustration, elegant restrained shading, readable hands and joints, not a cartoon child, not photorealistic. Simple consistent diffuse studio lighting, no scenery, no mosque, no rug ornaments.
The exact atlas cells, in row-major order from top-left to bottom-right:
1. Opening hand-raise pose: standing upright, both open hands raised around shoulder height, palms facing forwards, both feet on the floor. Three-quarter front view.
2. Standing folded-arms pose: upright, right hand rests over left forearm, both hands held in front of torso. Three-quarter front view.
3. Bowing pose: SIDE view facing image-left, hips bent, torso and back straight and approximately horizontal, hands on knees, knees not in a deep squat, head aligned with back, both feet on ground.
4. Upright recovery pose: standing fully straight, arms relaxed alongside the torso, both feet on floor. Three-quarter front view.
5. Prostration pose: SIDE view facing image-left, forehead touches the floor, both palms supported on the floor beside the head, forearms raised off floor, knees on floor, hips elevated above shoulders, feet behind with toes bent toward image-left. Show complete hands, head, elbows, knees and feet. This is a floor-contact pose, NOT a child's-pose stretch.
6. Upright seated-on-folded-legs pose: torso vertical, hands resting on thighs, knees in front, left foot folded under seated body and right foot upright behind. Three-quarter side view so folded legs remain visible.
7. Final seated pose: torso vertical, hands resting over thighs, left leg folded across underneath with left foot emerging to the right side and right foot upright. Three-quarter front view. The precise leg arrangement is a draft awaiting reviewer confirmation; do not add any instructional text.
8. Closing head-turn to the mannequin's anatomical RIGHT: seated upright on folded legs, shoulders and torso still facing directly towards camera, head rotated right towards image-left. Blank head has a subtle asymmetric front/back plane so rotation reads without any facial features. Hands stay on thighs.
9. Closing head-turn to the mannequin's anatomical LEFT: same seated body facing directly towards camera as cell 8, head rotated left towards image-right. Hands stay on thighs.
Critical consistency: all 9 drawings show one and the same clothed faceless adult mannequin; exactly two arms, two hands, two legs and two feet per figure, no extra digits or limbs, no cropped extremities. Each cell independent, balanced, and easily usable as an app illustration. The 3x3 atlas is a pose asset catalogue, not a claim that these nine frames form a complete prayer or specify repetition counts. No text anywhere. Aim for a high-resolution square atlas.
```

## Correction prompt

```text
Edit this draft 3x3 mannequin illustration atlas. Preserve the exact 3-by-3 equal square layout, same anonymous faceless adult mannequin, olive tunic and trousers, all 9 pose categories and their order. Correct the atlas as follows:
The entire background MUST be fully opaque, solid uniform warm ivory #F8F5ED in every cell and at every outside edge. Remove all transparency, all black background, all red/yellow/white fringe artifacts, and all dividing/grid lines. Keep only very soft clean gray-green floor shadows. No checkerboard, no text, no grid rules.
In the TOP RIGHT cell ONLY, correct the bowing silhouette: a full exact SIDE view facing image-left, straight horizontal flat back and torso at roughly 90 degrees to the upright legs, head in line with that horizontal back, hands placed on knees. Hips much farther back, torso extends horizontally toward the left; not a 45-degree bent stance.
Fit every figure comfortably INSIDE its own cell with at least 8% clear margin on all sides, including hands and feet. Keep the exact equal thirds grid registration so the application can crop cells. Keep other poses and their details unchanged. Premium soft 3D educational asset, no facial features, no historical person, no labels, no numerals, no lettering. OUTPUT A FULLY OPAQUE RGB-STYLE IMAGE WITH SOLID IVORY BACKGROUND.
```
