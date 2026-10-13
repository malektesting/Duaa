import { SectionPlaceholder } from '../components/SectionPlaceholder';
import { useAppPreferences } from '../preferences/AppPreferences';
export default function FavoritesRoute() {
  const { t } = useAppPreferences();
  return <SectionPlaceholder title={t.favoritesTitle} />;
}
