import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FeatureLink } from '../components/FeatureLink';
import { NavigationLink } from '../components/NavigationLink';
import { PrayerTimesBanner } from '../components/PrayerTimesBanner';
import { RestartBanner } from '../components/RestartBanner';
import { Screen } from '../design/Screen';
import { UiIcon } from '../design/UiIcon';
import { colors, layout, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

export default function HomeRoute() {
  const { t, scale } = useAppPreferences();
  const router = useRouter();
  return (
    <Screen spacious>
      <RestartBanner />
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text accessibilityRole="header" style={[styles.title, scaledType('title', scale)]}>{t.brandName}</Text>
          <Text style={[styles.subtitle, scaledType('body', scale)]}>{t.homeDescription}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={t.openSettings} onPress={() => router.navigate('/settings')} style={({ pressed }) => [styles.settings, pressed && styles.pressed]}>
          <UiIcon name="settings" />
        </Pressable>
      </View>
      <PrayerTimesBanner />
      <View style={styles.links}>
        <FeatureLink href="/body-purity" title={t.bodyPurityTitle} icon="water" />
        <FeatureLink href="/wudu" title={t.wuduTitle} icon="water" />
        <FeatureLink href="/salah" title={t.salahTitle} icon="book" />
        <FeatureLink href="/duas" title={t.duasTitle} icon="source" />
      </View>
      <Text style={[styles.footer, scaledType('label', scale)]}>{t.offlineLabel}</Text>
      {__DEV__ ? <NavigationLink href="/artwork-review" label={t.sectionArtworkTitle} variant="secondary" /> : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, paddingVertical: spacing.md },
  heading: { flex: 1, gap: spacing.sm },
  title: { color: colors.ink, fontWeight: typography.weight.bold, writingDirection: 'auto' },
  subtitle: { color: colors.mutedInk, writingDirection: 'auto' },
  settings: { width: layout.touchMinHeight, height: layout.touchMinHeight, alignItems: 'center', justifyContent: 'center', borderRadius: radius.control, backgroundColor: colors.sage },
  pressed: { backgroundColor: colors.oliveTint },
  links: { gap: spacing.lg },
  footer: { color: colors.mutedInk, textAlign: 'center', writingDirection: 'auto' },
});
