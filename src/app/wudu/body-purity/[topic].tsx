import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { PendingContent } from '../../../components/PendingContent';
import { RestartBanner } from '../../../components/RestartBanner';
import { bodyPurityTopics } from '../../../content/wuduSections';
import { Screen } from '../../../design/Screen';
import { useAppPreferences } from '../../../preferences/AppPreferences';

export default function BodyPurityTopicRoute() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const { t } = useAppPreferences();
  const entry = bodyPurityTopics.find(item => item.id === topic);
  if (!entry) return <Redirect href="/body-purity" />;
  const title = t[entry.titleKey];
  return (
    <Screen>
      <Stack.Screen options={{ title }} />
      <RestartBanner />
      <PendingContent title={title} />
    </Screen>
  );
}
