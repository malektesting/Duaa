import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, layout, motion, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

export function NavigationLink({ href, label, variant = 'primary' }: {
  href: Href;
  label: string;
  variant?: 'primary' | 'secondary' | 'light';
}) {
  const { scale } = useAppPreferences();
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => router.navigate(href)}
      style={({ pressed }) => [
        styles.control,
        variant === 'secondary' && styles.secondary,
        variant === 'light' && styles.light,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, variant !== 'primary' && styles.darkLabel, scaledType('body', scale)]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  control: {
    minHeight: layout.touchMinHeight + spacing.sm,
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.control,
    backgroundColor: colors.olive,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  secondary: { backgroundColor: colors.surface, borderColor: colors.border },
  light: { backgroundColor: colors.surface },
  pressed: { opacity: motion.pressOpacity },
  darkLabel: { color: colors.olive },
  label: {
    color: colors.white,
    fontWeight: typography.weight.medium,
    writingDirection: 'auto',
    textAlign: 'center',
  },
});
