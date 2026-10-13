import { FeatureLink } from '../../components/FeatureLink';
import { RestartBanner } from '../../components/RestartBanner';
import { ScreenHeading } from '../../components/ScreenHeading';
import { salahSections } from '../../content/sectionCatalog';
import { Screen } from '../../design/Screen';
import { useAppPreferences } from '../../preferences/AppPreferences';

export default function SalahRoute() {
  const { t } = useAppPreferences();
  return <Screen>
    <RestartBanner />
    <ScreenHeading title={t.salahTitle} description={t.homeDescription} />
    {salahSections.map(topic => <FeatureLink key={topic.id}
      href={{ pathname: '/salah/topic/[topic]', params: { topic: topic.id } }}
      title={t[topic.titleKey]} icon="book" />)}
  </Screen>;
}
