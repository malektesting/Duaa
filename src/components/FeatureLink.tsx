import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { UiIcon, type IconName } from '../design/UiIcon';
import { colors, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

export function FeatureLink({ href, title, description, icon }: { href: Href; title: string; description?: string; icon: IconName }) {
  const { scale, appliedDirection } = useAppPreferences();
  const router = useRouter();
  return (
      <Pressable accessibilityRole="link" onPress={() => router.navigate(href)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.icon}><UiIcon name={icon} /></View>
        <View style={styles.copy}>
          <Text style={[styles.title, scaledType('heading', scale)]}>{title}</Text>
          {description ? <Text style={[styles.description, scaledType('label', scale)]}>{description}</Text> : null}
        </View>
        <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.chevron, { transform: [{ rotate: appliedDirection === 'rtl' ? '45deg' : '-45deg' }] }]} />
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.xl, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  pressed: { backgroundColor: colors.oliveTint, borderColor: colors.olive },
  icon: { width: 46, height: 46, borderRadius: radius.control, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.sage },
  copy: { flex: 1, gap: spacing.xs },
  title: { color: colors.ink, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  description: { color: colors.mutedInk, writingDirection: 'auto' },
  chevron: { width: 8, height: 8, borderBottomWidth: 1.5, borderEndWidth: 1.5, borderColor: colors.olive },
});
