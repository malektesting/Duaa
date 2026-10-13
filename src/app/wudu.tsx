import { FeatureLink } from '../components/FeatureLink';
import { RestartBanner } from '../components/RestartBanner';
import { ScreenHeading } from '../components/ScreenHeading';
import { wuduSections } from '../content/wuduSections';
import { Screen } from '../design/Screen';
import { useAppPreferences } from '../preferences/AppPreferences';
export default function WuduRoute() {
  const { t } = useAppPreferences();
  return (
    <Screen>
      <RestartBanner />
      <ScreenHeading title={t.wuduTitle} description={t.homeDescription} />
      {wuduSections.map(section => (
        <FeatureLink key={section.id}
          href={{ pathname: '/wudu/[section]', params: { section: section.id } }}
          title={t[section.titleKey]} icon="book" />
      ))}
    </Screen>
  );
}
