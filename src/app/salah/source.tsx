import { ContentNotice } from '../../components/ContentNotice';
import { NavigationLink } from '../../components/NavigationLink';
import { PendingContent } from '../../components/PendingContent';
import { RestartBanner } from '../../components/RestartBanner';
import { ScreenHeading } from '../../components/ScreenHeading';
import { Screen } from '../../design/Screen';
import { useAppPreferences } from '../../preferences/AppPreferences';

export default function SalahSourceRoute() {
  const { t } = useAppPreferences();
  return (
    <Screen spacious>
      <RestartBanner />
      <ScreenHeading eyebrow={t.salahGuideTitle} title={t.sourceDetailsTitle} description={t.sourceDescription} />
      <PendingContent title={t.sourceReferenceTitle} />
      <PendingContent title={t.sourceTextTitle} variant="reading" />
      <PendingContent title={t.sourceTranslationTitle} />
      <ContentNotice />
      <NavigationLink href="/salah/guide" label={t.openSalahGuide} variant="secondary" />
    </Screen>
  );
}
