import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { RestartBanner } from '../components/RestartBanner';
import { NavigationLink } from '../components/NavigationLink';
import { ScreenHeading } from '../components/ScreenHeading';
import { Card } from '../design/Card';
import { Screen } from '../design/Screen';
import { colors, layout, motion, radius, scaledType, spacing, typography } from '../design/tokens';
import {
  SUPPORTED_LANGUAGES,
  directionLabel,
  translations,
  type LanguageCode,
} from '../localization/translations';
import { useAppPreferences } from '../preferences/AppPreferences';
import {
  TEXT_SIZE_KEYS,
  textSizeLabel,
  type TextSizeKey,
} from '../preferences/textSize';

export default function SettingsRoute() {
  const {
    t,
    scale,
    language,
    textSize,
    appliedDirection,
    requestedDirection,
    setLanguage,
    setTextSize,
  } = useAppPreferences();

  return (
    <Screen spacious>
      <RestartBanner />
      <ScreenHeading eyebrow={t.brandName} title={t.readingPreferences} description={t.settingsDescription} />

      <Section title={t.languageSection} scale={scale}>
        {SUPPORTED_LANGUAGES.map((code: LanguageCode) => (
          <OptionRow
            key={code}
            label={translations[code].languageName}
            selected={code === language}
            selectedBadge={t.selectedBadge}
            scale={scale}
            onPress={() => setLanguage(code)}
          />
        ))}
      </Section>

      <Section title={t.textSizeSection} scale={scale}>
        {TEXT_SIZE_KEYS.map((key: TextSizeKey) => (
          <OptionRow
            key={key}
            label={textSizeLabel(t, key)}
            selected={key === textSize}
            selectedBadge={t.selectedBadge}
            scale={scale}
            onPress={() => setTextSize(key)}
          />
        ))}
        <Text style={[styles.sample, scaledType('body', scale)]}>
          {`${t.textSizeSampleLabel}: ${t.appName}`}
        </Text>
      </Section>

      <Section title={t.diagnosticsSection} scale={scale}>
        <Text style={[styles.note, scaledType('label', scale)]}>
          {`${t.appliedDirectionLabel}: ${directionLabel(t, appliedDirection)}`}
        </Text>
        <Text style={[styles.note, scaledType('label', scale)]}>
          {`${t.pendingDirectionLabel}: ${directionLabel(t, requestedDirection)}`}
        </Text>
      </Section>

      <NavigationLink href="/" label={t.homeTitle} variant="secondary" />
    </Screen>
  );
}

function Section({
  title,
  scale,
  children,
}: {
  title: string;
  scale: number;
  children: ReactNode;
}) {
  return (
    <Card>
      <Text accessibilityRole="header" style={[styles.sectionTitle, scaledType('heading', scale)]}>
        {title}
      </Text>
      {children}
    </Card>
  );
}

function OptionRow({
  label,
  selected,
  selectedBadge,
  scale,
  onPress,
}: {
  label: string;
  selected: boolean;
  selectedBadge: string;
  scale: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={selected ? `${label}, ${selectedBadge}` : label}
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        pressed && styles.optionPressed,
      ]}
    >
      <Text
        style={[
          styles.optionLabel,
          selected && styles.optionLabelSelected,
          scaledType('body', scale),
        ]}
      >
        {label}
      </Text>
      {selected ? (
        <Text
          style={[styles.check, scaledType('body', scale)]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          ✓
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontWeight: typography.weight.bold, color: colors.ink, writingDirection: 'auto' },
  option: {
    // React Native reverses row under RTL; text can wrap around the check mark.
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: layout.touchMinHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionSelected: { borderColor: colors.olive, backgroundColor: colors.oliveTint },
  optionPressed: { opacity: motion.pressOpacity },
  optionLabel: { color: colors.ink, flexShrink: 1, writingDirection: 'auto' },
  optionLabelSelected: { color: colors.olive, fontWeight: typography.weight.medium },
  check: { color: colors.olive, fontWeight: typography.weight.bold },
  sample: { color: colors.mutedInk, writingDirection: 'auto', padding: spacing.lg, backgroundColor: colors.sage, borderRadius: radius.control },
  note: { color: colors.mutedInk, writingDirection: 'auto' },
});
