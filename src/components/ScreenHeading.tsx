import { StyleSheet, Text, View } from 'react-native';

import { colors, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

export function ScreenHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  const { scale } = useAppPreferences();
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={[styles.eyebrow, scaledType('label', scale)]}>{eyebrow}</Text> : null}
      <Text accessibilityRole="header" style={[styles.title, scaledType('title', scale)]}>{title}</Text>
      {description ? <Text style={[styles.description, scaledType('body', scale)]}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  eyebrow: { color: colors.olive, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  title: { color: colors.ink, fontWeight: typography.weight.bold, writingDirection: 'auto' },
  description: { color: colors.mutedInk, writingDirection: 'auto' },
});
