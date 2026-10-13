import { StyleSheet, Text, View } from 'react-native';

import { UiIcon } from '../design/UiIcon';
import { colors, radius, scaledType, spacing, typography } from '../design/tokens';
import { PENDING_VERIFICATION } from '../localization/translations';
import { useAppPreferences } from '../preferences/AppPreferences';

export function PendingContent({ title, variant = 'default' }: { title: string; variant?: 'default' | 'illustration' | 'reading' }) {
  const { t, scale } = useAppPreferences();
  const reading = variant === 'reading';
  const illustration = variant === 'illustration';

  return (
    <View style={[styles.card, reading && styles.reading, illustration && styles.illustration]}>
      <View style={styles.headingRow}>
        <UiIcon name={illustration ? 'image' : reading ? 'book' : 'source'} inverse={reading} />
        <Text accessibilityRole="header" style={[styles.heading, reading && styles.light, scaledType('heading', scale)]}>{title}</Text>
      </View>
      <View style={[styles.content, illustration && styles.illustrationContent, reading && styles.readingContent]}>
        {illustration ? <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.emptyFrame} /> : null}
        <Text style={[styles.placeholder, reading && styles.light, scaledType('body', scale)]}>{PENDING_VERIFICATION}</Text>
      </View>
      {illustration ? <Text style={[styles.note, scaledType('label', scale)]}>{t.contentSlotNote}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: spacing.xl, gap: spacing.lg },
  reading: { backgroundColor: colors.forest, borderColor: colors.forest },
  illustration: { backgroundColor: colors.sage },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heading: { flex: 1, color: colors.ink, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  content: { borderStartWidth: 2, borderColor: colors.border, paddingStart: spacing.lg, paddingVertical: spacing.sm },
  illustrationContent: { minHeight: 184, alignItems: 'center', justifyContent: 'center', borderStartWidth: 0, paddingStart: 0, gap: spacing.xl },
  readingContent: { minHeight: 112, borderColor: colors.ornament, justifyContent: 'center' },
  placeholder: { color: colors.mutedInk, writingDirection: 'auto' },
  light: { color: colors.forestInk },
  note: { color: colors.mutedInk, writingDirection: 'auto', textAlign: 'center' },
  emptyFrame: { width: 62, height: 76, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.olive, borderTopStartRadius: 32, borderTopEndRadius: 32, borderBottomStartRadius: 6, borderBottomEndRadius: 6 },
});
