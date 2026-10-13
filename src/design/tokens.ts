/** Shared visual language. Values are in React Native density-independent points. */
export const colors = {
  canvas: '#F8F5ED',
  surface: '#FFFCF6',
  ink: '#263128',
  mutedInk: '#526158',
  olive: '#435C4B',
  olivePressed: '#344A3B',
  oliveTint: '#E9EEE3',
  border: '#D4D9CE',
  gold: '#97743A',
  warningSurface: '#FFF1D6',
  warningBorder: '#A4712C',
  warningInk: '#684316',
  white: '#FFFFFF',
  forest: '#243F35',
  forestInk: '#E0E9DE',
  ornament: '#BDA575',
  sand: '#F0E8D8',
  sage: '#EDF1E9',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, section: 40 } as const;
export const radius = { control: 14, card: 22, hero: 28, pill: 999 } as const;
export const layout = { contentMaxWidth: 720, touchMinHeight: 48 } as const;
export const typography = {
  size: { display: 34, title: 28, heading: 20, body: 16, label: 14 },
  lineHeightRatio: 1.5,
  weight: { regular: '400', medium: '600', bold: '700' },
} as const;
export const shadows = { none: { elevation: 0 } } as const;
export const motion = { pressOpacity: 0.76 } as const;

export type TypeRole = keyof typeof typography.size;

/** Scales line height with both app preference and OS font scaling. */
export function scaledType(role: TypeRole, scale: number) {
  const fontSize = Math.round(typography.size[role] * scale);
  return { fontSize, lineHeight: Math.ceil(fontSize * typography.lineHeightRatio) };
}
