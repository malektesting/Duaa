import { ContentNotice } from '../../components/ContentNotice';
import { FeatureLink } from '../../components/FeatureLink';
import { NavigationLink } from '../../components/NavigationLink';
import { PendingContent } from '../../components/PendingContent';
import { RestartBanner } from '../../components/RestartBanner';
import { ScreenHeading } from '../../components/ScreenHeading';
import { Screen } from '../../design/Screen';
import { useAppPreferences } from '../../preferences/AppPreferences';

export default function SalahGuideRoute() {
  const { t } = useAppPreferences();
  return (
    <Screen spacious>
      <RestartBanner />
      <ScreenHeading eyebrow={t.salahTitle} title={t.salahGuideTitle} description={t.guideDescription} />
      {__DEV__ ? <NavigationLink href="/salah/steps" label={t.openPoseDrafts} /> : null}
      <PendingContent title={t.guideIllustrationTitle} variant="illustration" />
      <PendingContent title={t.guideInstructionTitle} />
      <PendingContent title={t.guideTextTitle} variant="reading" />
      <FeatureLink href="/salah/source" title={t.sourceDetailsTitle} description={t.sourceDescription} icon="source" />
      <ContentNotice />
      <NavigationLink href="/settings" label={t.readingPreferences} variant="secondary" />
    </Screen>
  );
}
