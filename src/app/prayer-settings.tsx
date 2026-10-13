import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RestartBanner } from '../components/RestartBanner';
import { ScreenHeading } from '../components/ScreenHeading';
import { Card } from '../design/Card';
import { Screen } from '../design/Screen';
import { colors, layout, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';
import { CITIES, METHODS } from '../prayerTimes/engine';
import { prayerCopy } from '../prayerTimes/copy';
import { usePrayerTimes } from '../prayerTimes/PrayerTimesProvider';

export default function PrayerSettingsRoute() {
  const { language, scale } = useAppPreferences();
  const copy = prayerCopy[language];
  const { config, ready, locating, locationError, storageError, locate, selectCity, update, clear } = usePrayerTimes();
  const router = useRouter();
  const textStyle = [styles.text, scaledType('body', scale)];
  function option(label: string, action: () => void, selected = false, disabled = false, radio = false) {
    return <Pressable key={label} accessibilityRole={radio ? 'radio' : 'button'} accessibilityState={radio ? { checked: selected, disabled: disabled || !ready } : { disabled: disabled || !ready }} disabled={disabled || !ready} onPress={action} style={({ pressed }) => [styles.option, selected && styles.selected, pressed && styles.pressed, disabled && styles.disabled]}>
      <Text style={[...textStyle, selected && styles.selectedText]}>{label}</Text>
      {selected && <Text accessible={false} style={styles.selectedText}>✓</Text>}
    </Pressable>;
  }
  return <Screen spacious>
    <RestartBanner />
    <ScreenHeading title={copy.settings} description={copy.privacy} />
    <Card>
      {option(locating ? copy.locating : copy.device, () => { void locate(); }, false, locating)}
      {locationError && <Text accessibilityRole="alert" style={textStyle}>{copy[locationError]}</Text>}
      {config.location && <>
        <Text style={textStyle}>{copy.zone}: {config.location.timeZone}</Text>
        <Text style={textStyle}>{copy.savedAt}: {new Intl.DateTimeFormat(language === 'ar' ? 'ar-AE' : 'en-GB', { timeZone: config.location.timeZone, dateStyle: 'medium', timeStyle: 'short' }).format(config.location.updatedAt)}</Text>
      </>}
      <Text style={textStyle}>{copy.manualNote}</Text>
    </Card>
    <Card>
      <Text accessibilityRole="header" style={[styles.heading, scaledType('heading', scale)]}>{copy.cities}</Text>
      {CITIES.map(city => option(city[language], () => selectCity(city.id), config.location?.source === 'city' && config.location.cityId === city.id, false, true))}
    </Card>
    <Card>
      <Text accessibilityRole="header" style={[styles.heading, scaledType('heading', scale)]}>{copy.method}</Text>
      <Text style={textStyle}>{copy.confirmMethod}</Text>
      {METHODS.map(method => option(copy.methods[method], () => update({ method }), config.method === method, false, true))}
      <Text accessibilityRole="header" style={[styles.heading, scaledType('heading', scale)]}>{copy.asr}</Text>
      {option(copy.standard, () => update({ asr: 'standard' }), config.asr === 'standard', false, true)}
      {option(copy.hanafi, () => update({ asr: 'hanafi' }), config.asr === 'hanafi', false, true)}
      <Text style={textStyle}>{copy.calculated}</Text>
    </Card>
    {storageError && <Text accessibilityRole="alert" style={textStyle}>{copy.storageError}</Text>}
    {config.location && option(copy.forget, clear)}
    {option(copy.done, () => router.navigate('/'))}
    <View><Text style={[styles.text, scaledType('label', scale)]}>{copy.source}</Text></View>
  </Screen>;
}
const styles = StyleSheet.create({
  text: { color: colors.mutedInk, writingDirection: 'auto' },
  heading: { color: colors.ink, fontWeight: typography.weight.bold, writingDirection: 'auto' },
  option: { minHeight: layout.touchMinHeight, padding: spacing.lg, borderRadius: radius.control, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'space-between' },
  selected: { backgroundColor: colors.oliveTint, borderColor: colors.olive },
  selectedText: { color: colors.olive, fontWeight: typography.weight.bold },
  pressed: { opacity: 0.75 }, disabled: { opacity: 0.5 },
});
