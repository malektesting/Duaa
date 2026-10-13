import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationLink } from '../components/NavigationLink';
import { PendingContent } from '../components/PendingContent';
import { RestartBanner } from '../components/RestartBanner';
import { ScreenHeading } from '../components/ScreenHeading';
import { Screen } from '../design/Screen';
import { colors, radius, scaledType, spacing } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';

// Human review drafts: avoid both displaying and bundling these in release.
const artwork = __DEV__ ? [
  { titleKey: 'bodyPurityTitle', source: require('../../assets/illustrations/section-drafts/body-purity.png') },
  { titleKey: 'wuduTitle', source: require('../../assets/illustrations/section-drafts/wudu.png') },
  { titleKey: 'salahTitle', source: require('../../assets/illustrations/section-drafts/salah.png') },
  { titleKey: 'duasTitle', source: require('../../assets/illustrations/section-drafts/duas.png') },
] as const : [];

export default function ArtworkReviewRoute() {
  const { t, scale } = useAppPreferences();
  if (!__DEV__) return <Screen><PendingContent title={t.sectionArtworkTitle} /></Screen>;
  return <Screen>
    <RestartBanner />
    <ScreenHeading eyebrow={t.draftReviewTitle} title={t.sectionArtworkTitle} description={t.sectionArtworkDescription} />
    {artwork.map(item => <View key={item.titleKey} style={styles.card}>
      <Text accessibilityRole="header" style={[styles.title, scaledType('heading', scale)]}>{t[item.titleKey]}</Text>
      <Image source={item.source} resizeMode="contain" style={styles.image}
        accessible accessibilityLabel={t[item.titleKey] + '. ' + t.draftReviewTitle} />
      <Text style={[styles.note, scaledType('label', scale)]}>{t.draftReviewTitle}</Text>
    </View>)}
    <NavigationLink href="/salah/steps" label={t.openPoseDrafts} variant="secondary" />
  </Screen>;
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.ink, writingDirection: 'auto' },
  image: { width: '100%', aspectRatio: 1, borderRadius: radius.control },
  note: { color: colors.mutedInk, writingDirection: 'auto' },
});
