import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { PendingContent } from '../../components/PendingContent';
import { RestartBanner } from '../../components/RestartBanner';
import { wuduSections } from '../../content/wuduSections';
import { Screen } from '../../design/Screen';
import { useAppPreferences } from '../../preferences/AppPreferences';

export default function WuduSectionRoute() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { t } = useAppPreferences();
  if (section === 'body-purity') return <Redirect href="/body-purity" />;
  const entry = wuduSections.find(item => item.id === section);
  if (!entry) return <Redirect href="/wudu" />;
  const title = t[entry.titleKey];
  return (
    <Screen>
      <Stack.Screen options={{ title }} />
      <RestartBanner />
      <PendingContent title={title} />
    </Screen>
  );
}
