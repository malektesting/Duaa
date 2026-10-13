/**
 * Visual review frames requested by the human on 2026-09-29.
 * These are NOT religious records, verified instructions, or a complete prayer.
 * Atlas coordinates are physical image coordinates and must never mirror in RTL.
 * Reusing the floor-contact image does not encode a rak'ah count or a prayer flow.
 */
export const SALAH_POSE_DRAFTS = [
  { id: 'opening', row: 0, column: 0 },
  { id: 'standing', row: 0, column: 1 },
  { id: 'bowing', row: 0, column: 2 },
  { id: 'upright', row: 1, column: 0 },
  { id: 'floor-contact-a', row: 1, column: 1 },
  { id: 'seated', row: 1, column: 2 },
  { id: 'floor-contact-b', row: 1, column: 1 },
  { id: 'final-seated', row: 2, column: 0 },
  { id: 'head-turn-right', row: 2, column: 1 },
  { id: 'head-turn-left', row: 2, column: 2 },
] as const;

export type SalahPoseDraft = (typeof SALAH_POSE_DRAFTS)[number];
