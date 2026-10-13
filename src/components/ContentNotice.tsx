import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

export function ContentNotice() {
  const { t, scale } = useAppPreferences();
  return (
    <View style={styles.notice}>
      <Text style={[styles.title, scaledType('label', scale)]}>{t.contentSlotTitle}</Text>
      <Text style={[styles.body, scaledType('label', scale)]}>{t.contentSlotNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { borderStartWidth: 3, borderColor: colors.gold, borderRadius: radius.control, backgroundColor: colors.sand, padding: spacing.lg, gap: spacing.xs },
  title: { color: colors.ink, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  body: { color: colors.mutedInk, writingDirection: 'auto' },
});
