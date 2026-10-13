import { RestartBanner } from './RestartBanner';
import { ScreenHeading } from './ScreenHeading';
import { Screen } from '../design/Screen';
import { useAppPreferences } from '../preferences/AppPreferences';

/** Navigation destination only; section content is a separate checkpoint. */
export function SectionPlaceholder({ title }: { title: string }) {
  const { t } = useAppPreferences();
  return (
    <Screen spacious>
      <RestartBanner />
      <ScreenHeading title={title} description={t.sectionInPreparation} />
    </Screen>
  );
}
