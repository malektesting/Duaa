/**
 * App preference store.
 *
 * Scope of persistence is deliberately narrow: language and text size only.
 * PrayerTimesProvider separately owns the opt-in prayer-location settings (ADR-009).
 * No analytics, progress, or location history are stored.
 *
 * ---------------------------------------------------------------------------
 * Layout direction (the important part)
 * ---------------------------------------------------------------------------
 * React Native resolves layout direction natively, once, when the JS bundle
 * starts. `I18nManager.forceRTL()` writes the desired direction to native
 * storage but does NOT restyle the running app — mounted views keep the
 * direction they were laid out with. Only a full reload picks it up.
 *
 * Because `I18nManager.isRTL` can report the newly requested value straight
 * after `forceRTL`, it is not a reliable read of what is actually on screen.
 * We therefore snapshot it ONCE at module load, before anything can call
 * `forceRTL`, and treat that snapshot as the applied direction for this
 * session. Everything else is a pending request.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DevSettings, I18nManager, Platform } from 'react-native';

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_DIRECTION,
  isSupportedLanguage,
  translations,
  type LanguageCode,
  type LayoutDirection,
  type Translation,
} from '../localization/translations';
import {
  DEFAULT_TEXT_SIZE,
  TEXT_SIZE_SCALE,
  isTextSizeKey,
  type TextSizeKey,
} from './textSize';

const STORAGE_KEY_LANGUAGE = 'salah.pref.language';
const STORAGE_KEY_TEXT_SIZE = 'salah.pref.textSize';

/**
 * The direction this JS session was actually laid out with. Captured before any
 * `forceRTL` call so it cannot be contaminated by a pending request.
 */
const APPLIED_DIRECTION: LayoutDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

/** Programmatic reload is only available with the dev client attached. */
const CAN_RELOAD_PROGRAMMATICALLY =
  __DEV__ && typeof DevSettings?.reload === 'function';

export interface AppPreferences {
  /** True once stored preferences have been read; screens wait for this. */
  isHydrated: boolean;

  language: LanguageCode;
  t: Translation;

  textSize: TextSizeKey;
  /** Multiplier to apply to base font sizes. */
  scale: number;

  /** Direction currently rendered on screen. */
  appliedDirection: LayoutDirection;
  /** Direction the saved language asks for. Equals applied once restarted. */
  requestedDirection: LayoutDirection;
  /** True when the two disagree and only a restart can reconcile them. */
  isRestartRequired: boolean;
  canReloadProgrammatically: boolean;

  setLanguage: (next: LanguageCode) => void;
  setTextSize: (next: TextSizeKey) => void;
  reloadApp: () => void;
}

const AppPreferencesContext = createContext<AppPreferences | null>(null);

function resolveDeviceLanguage(): LanguageCode {
  try {
    const [primary] = getLocales();
    const code = primary?.languageCode;
    return isSupportedLanguage(code) ? code : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

/**
 * Ask native to use `direction` from the next launch onward. Safe to call with
 * the direction already in use — it simply re-asserts the native value.
 */
function requestDirection(direction: LayoutDirection): void {
  if (Platform.OS === 'web') return;
  try {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(direction === 'rtl');
  } catch {
    // Direction stays as-is; `isRestartRequired` still reports the mismatch.
  }
}

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [textSize, setTextSizeState] = useState<TextSizeKey>(DEFAULT_TEXT_SIZE);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      let storedLanguage: string | null = null;
      let storedTextSize: string | null = null;

      try {
        const [languageEntry, textSizeEntry] = await AsyncStorage.multiGet([
          STORAGE_KEY_LANGUAGE,
          STORAGE_KEY_TEXT_SIZE,
        ]);
        storedLanguage = languageEntry?.[1] ?? null;
        storedTextSize = textSizeEntry?.[1] ?? null;
      } catch {
        // Storage unavailable: fall back to device defaults for this session.
      }

      if (cancelled) return;

      const nextLanguage = isSupportedLanguage(storedLanguage)
        ? storedLanguage
        : resolveDeviceLanguage();
      const nextTextSize = isTextSizeKey(storedTextSize) ? storedTextSize : DEFAULT_TEXT_SIZE;

      // Direction is asserted by the post-hydration effect below, so that there
      // is exactly one place that talks to I18nManager.
      setLanguageState(nextLanguage);
      setTextSizeState(nextTextSize);
      setIsHydrated(true);
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback((next: LanguageCode) => {
    setLanguageState((current) => (current === next ? current : next));
  }, []);

  const setTextSize = useCallback((next: TextSizeKey) => {
    setTextSizeState((current) => (current === next ? current : next));
  }, []);

  // Side effects live here rather than in the setters so that a double-invoked
  // state updater (React StrictMode) cannot fire `forceRTL` or a write twice.
  useEffect(() => {
    if (!isHydrated) return;
    requestDirection(LANGUAGE_DIRECTION[language]);
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = LANGUAGE_DIRECTION[language];
    }
    AsyncStorage.setItem(STORAGE_KEY_LANGUAGE, language).catch(() => {
      // Preference still applies for this session if the write fails.
    });
  }, [isHydrated, language]);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY_TEXT_SIZE, textSize).catch(() => {
      // Preference still applies for this session if the write fails.
    });
  }, [isHydrated, textSize]);

  const reloadApp = useCallback(() => {
    if (CAN_RELOAD_PROGRAMMATICALLY) {
      DevSettings.reload();
    }
  }, []);

  const value = useMemo<AppPreferences>(() => {
    const requestedDirection = LANGUAGE_DIRECTION[language];
    const appliedDirection = Platform.OS === 'web' ? requestedDirection : APPLIED_DIRECTION;
    return {
      isHydrated,
      language,
      t: translations[language],
      textSize,
      scale: TEXT_SIZE_SCALE[textSize],
      appliedDirection,
      requestedDirection,
      isRestartRequired: Platform.OS !== 'web' && isHydrated && requestedDirection !== appliedDirection,
      canReloadProgrammatically: CAN_RELOAD_PROGRAMMATICALLY,
      setLanguage,
      setTextSize,
      reloadApp,
    };
  }, [isHydrated, language, textSize, setLanguage, setTextSize, reloadApp]);

  return (
    <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>
  );
}

export function useAppPreferences(): AppPreferences {
  const value = useContext(AppPreferencesContext);
  if (!value) {
    throw new Error('useAppPreferences must be used inside <AppPreferencesProvider>.');
  }
  return value;
}
