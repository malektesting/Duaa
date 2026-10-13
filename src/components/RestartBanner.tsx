/**
 * Surfaces the one state React Native cannot hide: the saved language wants a
 * layout direction the running session is not using. Shown on every screen so
 * the mismatch is never silent.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, motion, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';
import { directionLabel } from '../localization/translations';

export function RestartBanner() {
  const {
    t,
    scale,
    isRestartRequired,
    appliedDirection,
    requestedDirection,
    canReloadProgrammatically,
    reloadApp,
  } = useAppPreferences();

  if (!isRestartRequired) return null;

  return (
    <View style={styles.banner} accessibilityRole="alert">
      <Text style={[styles.title, scaledType('heading', scale)]}>
        {t.restartTitle}
      </Text>
      <Text style={[styles.body, scaledType('label', scale)]}>
        {t.restartBody}
      </Text>

      <Text style={[styles.detail, scaledType('label', scale)]}>
        {`${t.appliedDirectionLabel}: ${directionLabel(t, appliedDirection)}`}
      </Text>
      <Text style={[styles.detail, scaledType('label', scale)]}>
        {`${t.pendingDirectionLabel}: ${directionLabel(t, requestedDirection)}`}
      </Text>

      {canReloadProgrammatically ? (
        <Pressable
          onPress={reloadApp}
          accessibilityRole="button"
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text style={[styles.actionText, scaledType('body', scale)]}>
            {t.restartActionNow}
          </Text>
        </Pressable>
      ) : (
        <Text style={[styles.hint, scaledType('label', scale)]}>
          {t.restartManualHint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderColor: colors.warningBorder,
    backgroundColor: colors.warningSurface,
    borderRadius: radius.card,
    padding: spacing.lg,
    gap: spacing.sm,
    borderStartWidth: 6,
  },
  title: { fontWeight: typography.weight.bold, color: colors.warningInk, writingDirection: 'auto' },
  body: { color: colors.warningInk, writingDirection: 'auto' },
  detail: { color: colors.warningInk, writingDirection: 'auto' },
  hint: { color: colors.warningInk, fontStyle: 'italic', writingDirection: 'auto' },
  action: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: layout.touchMinHeight,
    backgroundColor: colors.warningInk,
    borderRadius: radius.control,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  actionPressed: { opacity: motion.pressOpacity },
  actionText: { color: colors.white, fontWeight: typography.weight.medium, writingDirection: 'auto' },
});
