import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { FeatureLink } from '../../../components/FeatureLink';
import { PendingContent } from '../../../components/PendingContent';
import { RestartBanner } from '../../../components/RestartBanner';
import { ScreenHeading } from '../../../components/ScreenHeading';
import { dailyPrayers, salahSections } from '../../../content/sectionCatalog';
import { Screen } from '../../../design/Screen';
import { useAppPreferences } from '../../../preferences/AppPreferences';

export default function SalahTopicRoute() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const { t } = useAppPreferences();
  const entry = salahSections.find(item => item.id === topic);
  if (!entry) return <Redirect href="/salah" />;
  const title = t[entry.titleKey];
  return <Screen>
    <Stack.Screen options={{ title }} />
    <RestartBanner />
    {topic === 'daily-prayers' ? <>
      <ScreenHeading title={title} description={t.homeDescription} />
      {dailyPrayers.map(prayer => <FeatureLink key={prayer.id}
        href={{ pathname: '/salah/daily/[prayer]', params: { prayer: prayer.id } }}
        title={t[prayer.titleKey]} icon="book" />)}
    </> : <PendingContent title={title} />}
  </Screen>;
}
