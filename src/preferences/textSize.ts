/**
 * Text-size preference: the single accessibility setting persisted in Phase 1a.
 *
 * The design system applies these scales to its type ramp and line heights.
 */

import type { Translation } from '../localization/translations';

export type TextSizeKey = 'small' | 'medium' | 'large' | 'xlarge';

export const TEXT_SIZE_KEYS: readonly TextSizeKey[] = [
  'small',
  'medium',
  'large',
  'xlarge',
] as const;

export const DEFAULT_TEXT_SIZE: TextSizeKey = 'medium';

/**
 * `xlarge` is deliberately aggressive (1.45x). Layouts must survive it, which is
 * why every screen scrolls rather than clipping.
 */
export const TEXT_SIZE_SCALE: Record<TextSizeKey, number> = {
  small: 0.9,
  medium: 1,
  large: 1.2,
  xlarge: 1.45,
};

export function isTextSizeKey(value: unknown): value is TextSizeKey {
  return typeof value === 'string' && (TEXT_SIZE_KEYS as readonly string[]).includes(value);
}

export function textSizeLabel(t: Translation, key: TextSizeKey): string {
  switch (key) {
    case 'small':
      return t.textSizeSmall;
    case 'medium':
      return t.textSizeMedium;
    case 'large':
      return t.textSizeLarge;
    case 'xlarge':
      return t.textSizeExtraLarge;
  }
}
