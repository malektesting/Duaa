import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, layout, radius, scaledType, spacing, typography } from '../design/tokens';
import { useAppPreferences } from '../preferences/AppPreferences';
import { CITIES, calculateSchedule, countdown, dayKey, formatTime, nextPrayer } from '../prayerTimes/engine';
import { prayerCopy } from '../prayerTimes/copy';
import { usePrayerClock, usePrayerTimes } from '../prayerTimes/PrayerTimesProvider';

export function PrayerTimesBanner() {
  const { language, scale } = useAppPreferences();
  const copy = prayerCopy[language];
  const { config, ready, storageError } = usePrayerTimes();
  const router = useRouter();
  const now = usePrayerClock();
  const location = config.location;
  const date = location ? dayKey(new Date(now), location.timeZone) : '';
  const schedule = useMemo(() => {
    try { return calculateSchedule(config, date); } catch { return null; }
  }, [config, date]);
  const next = schedule ? nextPrayer(schedule.upcoming, now) : null;
  const city = CITIES.find(item => item.id === location?.cityId);
  const name = city ? city[language] : copy.deviceLocation;
  const open = () => router.navigate('/prayer-settings');
  const stale = location?.source === 'device' && now - location.updatedAt > 86400000;

  return (
    <View style={styles.banner}>
      {!location && <Text accessibilityRole="header" style={[styles.label, scaledType('heading', scale)]}>{copy.title}</Text>}
      {!ready ? <Text style={[styles.text, scaledType('body', scale)]}>{copy.loading}</Text> : !location ? (
        <>
          <Text style={[styles.main, scaledType('title', scale)]}>{copy.setup}</Text>
          <Text style={[styles.text, scaledType('body', scale)]}>{copy.setupBody}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.text, scaledType('label', scale)]}>{name} · {new Intl.DateTimeFormat(language === 'ar' ? 'ar-AE' : 'en-GB', { timeZone: location.timeZone, day: 'numeric', month: 'short' }).format(now)}</Text>
          {schedule && next ? (
            <>
              <View style={styles.next}>
                <View style={styles.nextGroup}>
                <Text style={[styles.label, scaledType('label', scale)]}>{copy.next}</Text>
                <Text style={[styles.main, scaledType('heading', scale)]}>{copy.prayers[next.name]} · {formatTime(next.time, location.timeZone, language)}</Text>
                </View>
                <View style={styles.nextGroup}>
                <Text style={[styles.label, scaledType('label', scale)]}>{copy.remaining}</Text>
                <Text accessibilityLabel={`${copy.remaining}: ${countdown(next.time.getTime(), now)}`} style={[styles.timer, scaledType('title', scale)]}>{countdown(next.time.getTime(), now)}</Text>
                </View>
              </View>
              <View style={styles.times}>
                {schedule.today.map(entry => (
                  <View key={entry.name} style={[styles.timeCell, { minWidth: scale > 1.2 ? 85 : 52 }, next.time.getTime() === entry.time.getTime() && styles.highlight]}>
                    <Text style={[styles.text, scaledType('label', scale)]}>{copy.prayers[entry.name]}</Text>
                    <Text style={[styles.time, scaledType('body', scale)]}>{formatTime(entry.time, location.timeZone, language)}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : <Text style={[styles.text, scaledType('body', scale)]}>{copy.noTimes}</Text>}
          <Text style={[styles.text, scaledType('label', scale)]}>{copy.calculated}</Text>
          {stale && <Text style={[styles.text, scaledType('label', scale)]}>{copy.stale}</Text>}
        </>
      )}
      {storageError && <Text accessibilityRole="alert" style={[styles.text, scaledType('label', scale)]}>{copy.storageError}</Text>}
      <Pressable disabled={!ready} accessibilityRole="button" onPress={open} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
        <Text style={[styles.actionText, scaledType('label', scale)]}>{location ? copy.change : copy.choose}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.forest, padding: spacing.lg, borderRadius: radius.hero, gap: spacing.sm },
  label: { color: colors.forestInk, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  text: { color: colors.forestInk, writingDirection: 'auto' },
  main: { color: colors.surface, fontWeight: typography.weight.bold, writingDirection: 'auto' },
  next: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md },
  nextGroup: { gap: spacing.xs, flexShrink: 1 },
  timer: { color: colors.surface, fontWeight: typography.weight.bold, writingDirection: 'ltr', fontVariant: ['tabular-nums'] },
  times: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  timeCell: { flexGrow: 1, padding: spacing.xs, borderRadius: radius.control, gap: spacing.xs },
  highlight: { backgroundColor: colors.olive, borderWidth: 1, borderColor: colors.ornament },
  time: { color: colors.surface, fontWeight: typography.weight.medium, writingDirection: 'auto', fontVariant: ['tabular-nums'] },
  action: { minHeight: layout.touchMinHeight, justifyContent: 'center', alignItems: 'center', padding: spacing.md, borderRadius: radius.control, backgroundColor: colors.surface },
  actionText: { color: colors.olive, fontWeight: typography.weight.medium, writingDirection: 'auto', textAlign: 'center' },
  pressed: { opacity: 0.8 },
});
