import { FeatureLink } from '../components/FeatureLink';
import { RestartBanner } from '../components/RestartBanner';
import { ScreenHeading } from '../components/ScreenHeading';
import { duaSections } from '../content/sectionCatalog';
import { Screen } from '../design/Screen';
import { useAppPreferences } from '../preferences/AppPreferences';
export default function DuasRoute() {
  const { t } = useAppPreferences();
  return <Screen>
    <RestartBanner />
    <ScreenHeading title={t.duasTitle} description={t.homeDescription} />
    {duaSections.map(topic => <FeatureLink key={topic.id}
      href={{ pathname: '/duas/[topic]', params: { topic: topic.id } }}
      title={t[topic.titleKey]} icon="source" />)}
  </Screen>;
}
