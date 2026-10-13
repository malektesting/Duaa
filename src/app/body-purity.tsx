import { FeatureLink } from '../components/FeatureLink';
import { RestartBanner } from '../components/RestartBanner';
import { ScreenHeading } from '../components/ScreenHeading';
import { bodyPurityTopics } from '../content/wuduSections';
import { Screen } from '../design/Screen';
import { useAppPreferences } from '../preferences/AppPreferences';

export default function BodyPurityRoute() {
  const { t } = useAppPreferences();
  return <Screen>
    <RestartBanner />
    <ScreenHeading title={t.bodyPurityTitle} description={t.homeDescription} />
    {bodyPurityTopics.map(topic => <FeatureLink key={topic.id}
      href={{ pathname: '/wudu/body-purity/[topic]', params: { topic: topic.id } }}
      title={t[topic.titleKey]} icon="book" />)}
  </Screen>;
}
