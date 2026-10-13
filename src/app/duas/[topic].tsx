import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { PendingContent } from '../../components/PendingContent';
import { RestartBanner } from '../../components/RestartBanner';
import { duaSections } from '../../content/sectionCatalog';
import { Screen } from '../../design/Screen';
import { useAppPreferences } from '../../preferences/AppPreferences';

export default function TopicRoute() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const { t } = useAppPreferences();
  const entry = duaSections.find(item => item.id === topic);
  if (!entry) return <Redirect href="/duas" />;
  const title = t[entry.titleKey];
  return <Screen>
    <Stack.Screen options={{ title }} />
    <RestartBanner />
    <PendingContent title={title} />
  </Screen>;
}
