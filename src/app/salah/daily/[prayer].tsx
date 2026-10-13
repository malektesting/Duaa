import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { PendingContent } from '../../../components/PendingContent';
import { RestartBanner } from '../../../components/RestartBanner';
import { dailyPrayers } from '../../../content/sectionCatalog';
import { Screen } from '../../../design/Screen';
import { useAppPreferences } from '../../../preferences/AppPreferences';

export default function TopicRoute() {
  const { prayer } = useLocalSearchParams<{ prayer: string }>();
  const { t } = useAppPreferences();
  const entry = dailyPrayers.find(item => item.id === prayer);
  if (!entry) return <Redirect href="/salah/topic/daily-prayers" />;
  const title = t[entry.titleKey];
  return <Screen>
    <Stack.Screen options={{ title }} />
    <RestartBanner />
    <PendingContent title={title} />
  </Screen>;
}
