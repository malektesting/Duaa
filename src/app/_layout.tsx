import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { colors } from '../design/tokens';
import { PrayerTimesProvider } from '../prayerTimes/PrayerTimesProvider';
import { prayerCopy } from '../prayerTimes/copy';
import { AppPreferencesProvider, useAppPreferences } from '../preferences/AppPreferences';

export default function RootLayout() {
  return (
    <AppPreferencesProvider>
      <StatusBar style="dark" />
      <PrayerTimesProvider><RootNavigator /></PrayerTimesProvider>
    </AppPreferencesProvider>
  );
}

/**
 * Header titles come from the active catalogue, so the navigator has to live
 * inside the provider. Rendering waits for hydration to avoid a flash of the
 * default language before the stored one loads.
 */
function RootNavigator() {
  const { isHydrated, t, language, requestedDirection } = useAppPreferences();

  if (!isHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.olive} />
      </View>
    );
  }

  return (
    <View style={[styles.appRoot, Platform.OS === 'web' && { direction: requestedDirection }]}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.canvas },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600' },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.canvas },
        }}
      >
        <Stack.Screen name="index" options={{ title: t.homeTitle }} />
        <Stack.Screen name="artwork-review" options={{ title: t.sectionArtworkTitle }} />
        <Stack.Screen name="prayer-settings" options={{ title: prayerCopy[language].settings }} />
        <Stack.Screen name="wudu" options={{ title: t.wuduTitle }} />
        <Stack.Screen name="body-purity" options={{ title: t.bodyPurityTitle }} />
        <Stack.Screen name="salah/topic/[topic]" options={{ title: t.salahTitle }} />
        <Stack.Screen name="salah/daily/[prayer]" options={{ title: t.dailyPrayersTitle }} />
        <Stack.Screen name="duas/[topic]" options={{ title: t.duasTitle }} />
        <Stack.Screen name="wudu/[section]" options={{ title: t.wuduTitle }} />
        <Stack.Screen name="duas" options={{ title: t.duasTitle }} />
        <Stack.Screen name="favorites" options={{ title: t.favoritesTitle }} />
        <Stack.Screen name="settings" options={{ title: t.settingsTitle }} />
        <Stack.Screen name="salah/index" options={{ title: t.salahTitle }} />
        <Stack.Screen name="salah/guide" options={{ title: t.salahGuideTitle }} />
        <Stack.Screen name="salah/source" options={{ title: t.sourceDetailsTitle }} />
        <Stack.Screen name="salah/steps" options={{ title: t.draftReviewTitle }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
  },
  appRoot: { flex: 1 },
});
