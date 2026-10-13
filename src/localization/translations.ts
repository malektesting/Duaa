/**
 * Localization catalogue.
 *
 * Every user-facing string in the app shell lives here. Screens must never
 * inline copy of their own.
 *
 * Phase 1a constraint: this file contains NO religious content. Anywhere a
 * verified religious text will eventually appear, the approved placeholder
 * `PENDING_VERIFICATION` is rendered instead.
 */

export type LanguageCode = 'ar' | 'en';
export type LayoutDirection = 'ltr' | 'rtl';

export const SUPPORTED_LANGUAGES: readonly LanguageCode[] = ['ar', 'en'] as const;

/** Arabic-first product: used when the device locale is neither ar nor en. */
export const DEFAULT_LANGUAGE: LanguageCode = 'ar';

export const LANGUAGE_DIRECTION: Record<LanguageCode, LayoutDirection> = {
  ar: 'rtl',
  en: 'ltr',
};

/**
 * The only placeholder permitted to stand in for unverified religious content
 * during Phase 1a. Must be rendered verbatim, in both languages.
 */
export const PENDING_VERIFICATION = '[بانتظار التحقق]';

export interface Translation {
  /** Approved store name for this language. */
  appName: string;
  languageName: string;
  brandName: string;
  wuduTitle: string;
  bodyPurityTitle: string;
  cleansingTitle: string;
  janabahGhuslTitle: string;
  wuduObligationsTitle: string;
  wuduSunnahTitle: string;
  wuduInvalidatorsTitle: string;
  tayammumTitle: string;
  salahPillarsTitle: string;
  dailyPrayersTitle: string;
  salahSunnahTitle: string;
  sujudSahwTitle: string;
  salahInvalidatorsTitle: string;
  salahRecommendedTitle: string;
  salahDislikedTitle: string;
  afterPrayerTitle: string;
  quranDuasTitle: string;
  sunnahDuasTitle: string;
  morningAdhkarTitle: string;
  eveningAdhkarTitle: string;
  fajrTitle: string;
  dhuhrTitle: string;
  asrTitle: string;
  maghribTitle: string;
  ishaTitle: string;
  duasTitle: string;
  favoritesTitle: string;
  sectionInPreparation: string;
  homeIntro: string;
  homeDescription: string;
  exploreTitle: string;
  guideDescription: string;
  sourceDescription: string;
  settingsDescription: string;
  readingPreferences: string;
  offlineLabel: string;
  languagePairLabel: string;
  draftReviewTitle: string;
  sectionArtworkTitle: string;
  sectionArtworkDescription: string;
  poseDraftTitle: string;
  poseDraftDescription: string;
  openPoseDrafts: string;
  draftFrameLabel: string;
  previousImage: string;
  nextImage: string;
  allDraftImages: string;

  homeTitle: string;
  settingsTitle: string;
  openSettings: string;
  back: string;
  salahTitle: string;
  openSalah: string;
  salahOverviewTitle: string;
  salahGuideTitle: string;
  openSalahGuide: string;
  guideInstructionTitle: string;
  guideIllustrationTitle: string;
  guideTextTitle: string;
  sourceDetailsTitle: string;
  openSourceDetails: string;
  sourceReferenceTitle: string;
  sourceTextTitle: string;
  sourceTranslationTitle: string;

  contentSlotTitle: string;
  contentSlotNote: string;

  languageSection: string;
  languageArabic: string;
  languageEnglish: string;

  textSizeSection: string;
  textSizeSmall: string;
  textSizeMedium: string;
  textSizeLarge: string;
  textSizeExtraLarge: string;
  textSizeSampleLabel: string;

  diagnosticsSection: string;
  appliedDirectionLabel: string;
  pendingDirectionLabel: string;
  directionRtl: string;
  directionLtr: string;

  restartTitle: string;
  restartBody: string;
  restartActionNow: string;
  restartManualHint: string;
  selectedBadge: string;
}

const ar: Translation = {
  appName: 'دليل المصلّي الميسّر',
  languageName: 'العربية',
  brandName: 'دليل المصلّي الميسّر',
  wuduTitle: 'الوضوء',
  bodyPurityTitle: 'طهارة البدن',
  cleansingTitle: 'النظافة والتطهّر للصلاة',
  janabahGhuslTitle: 'غُسل الجنابة',
  wuduObligationsTitle: 'فرائض الوضوء',
  wuduSunnahTitle: 'سنن الوضوء',
  wuduInvalidatorsTitle: 'نواقض الوضوء',
  tayammumTitle: 'التيمم',
  salahPillarsTitle: 'أركان الصلاة',
  dailyPrayersTitle: 'فرائض الصلاة — الصلوات الخمس',
  salahSunnahTitle: 'سنن الصلاة',
  sujudSahwTitle: 'سجود السهو',
  salahInvalidatorsTitle: 'مبطلات الصلاة',
  salahRecommendedTitle: 'المستحبات',
  salahDislikedTitle: 'المكروهات',
  afterPrayerTitle: 'أذكار بعد الصلاة',
  quranDuasTitle: 'أدعية من القرآن',
  sunnahDuasTitle: 'أدعية من السنة',
  morningAdhkarTitle: 'أذكار الصباح',
  eveningAdhkarTitle: 'أذكار المساء',
  fajrTitle: 'الفجر',
  dhuhrTitle: 'الظهر',
  asrTitle: 'العصر',
  maghribTitle: 'المغرب',
  ishaTitle: 'العشاء',
  duasTitle: 'الأدعية',
  favoritesTitle: 'المفضلة',
  sectionInPreparation: 'هذه الصفحة قيد الإعداد.',
  homeIntro: 'دليلك إلى الصلاة',
  homeDescription: 'اختر القسم الذي تريد تصفّحه.',
  exploreTitle: 'تصفّح الدليل',
  guideDescription: 'التعليمات والرسوم والنصوص',
  sourceDescription: 'المراجع والنصوص الأصلية والترجمات',
  settingsDescription: 'اختر اللغة وحجم النص المناسب لك.',
  readingPreferences: 'تفضيلات القراءة',
  offlineLabel: 'بدون إنترنت',
  languagePairLabel: 'العربية والإنجليزية',
  draftReviewTitle: 'مسودة للمراجعة',
  sectionArtworkTitle: 'معاينة الرسومات',
  sectionArtworkDescription: 'صور رمزية للأقسام، قيد المراجعة. لا توضّح خطوات أداء العبادات.',
  poseDraftTitle: 'من تكبيرة الإحرام إلى السلام',
  poseDraftDescription: 'رسوم أولية للمراجعة البصرية. لا تحدد عدد الركعات أو تسلسل صلاة كاملة.',
  openPoseDrafts: 'معاينة رسوم الحركات',
  draftFrameLabel: 'صورة {current} من {total}',
  previousImage: 'الصورة السابقة',
  nextImage: 'الصورة التالية',
  allDraftImages: 'جميع الصور',

  homeTitle: 'الرئيسية',
  settingsTitle: 'الإعدادات',
  openSettings: 'فتح الإعدادات',
  back: 'العودة',
  salahTitle: 'الصلاة',
  openSalah: 'تصفّح دليل الصلاة',
  salahOverviewTitle: 'نظرة عامة',
  salahGuideTitle: 'دليل الصلاة',
  openSalahGuide: 'فتح الدليل',
  guideInstructionTitle: 'التعليمات',
  guideIllustrationTitle: 'الرسم التوضيحي',
  guideTextTitle: 'النص',
  sourceDetailsTitle: 'تفاصيل المصدر',
  openSourceDetails: 'عرض تفاصيل المصدر',
  sourceReferenceTitle: 'المرجع',
  sourceTextTitle: 'النص الأصلي',
  sourceTranslationTitle: 'الترجمة',

  contentSlotTitle: 'محتوى قيد الإعداد',
  contentSlotNote: 'سيظهر المحتوى هنا بعد اعتماده.',

  languageSection: 'اللغة',
  languageArabic: 'العربية',
  languageEnglish: 'English',

  textSizeSection: 'حجم النص',
  textSizeSmall: 'صغير',
  textSizeMedium: 'متوسط',
  textSizeLarge: 'كبير',
  textSizeExtraLarge: 'كبير جدًا',
  textSizeSampleLabel: 'معاينة الحجم',

  diagnosticsSection: 'حالة الاتجاه',
  appliedDirectionLabel: 'الاتجاه المطبَّق حاليًا',
  pendingDirectionLabel: 'الاتجاه بانتظار إعادة التشغيل',
  directionRtl: 'من اليمين إلى اليسار',
  directionLtr: 'من اليسار إلى اليمين',

  restartTitle: 'يلزم إعادة تشغيل التطبيق',
  restartBody:
    'تم حفظ اللغة الجديدة ونصوصها معروضة الآن، لكن اتجاه التخطيط لا يتغيّر إلا بعد إعادة تشغيل التطبيق.',
  restartActionNow: 'إعادة التشغيل الآن',
  restartManualHint: 'أغلق التطبيق تمامًا ثم افتحه من جديد لتطبيق الاتجاه.',
  selectedBadge: 'محدد',
};

const en: Translation = {
  appName: 'Prayer Guide',
  languageName: 'English',
  brandName: 'Prayer Guide',
  wuduTitle: 'Wudu',
  bodyPurityTitle: 'Body purity',
  cleansingTitle: 'Cleanliness and purification for prayer',
  janabahGhuslTitle: 'Ghusl after janabah',
  wuduObligationsTitle: 'Wudu obligations',
  wuduSunnahTitle: 'Wudu sunnah practices',
  wuduInvalidatorsTitle: 'Wudu invalidators',
  tayammumTitle: 'Tayammum',
  salahPillarsTitle: 'Pillars of Salah',
  dailyPrayersTitle: 'Obligatory prayers — the five daily prayers',
  salahSunnahTitle: 'Sunnah practices of Salah',
  sujudSahwTitle: 'Prostration of forgetfulness',
  salahInvalidatorsTitle: 'Salah invalidators',
  salahRecommendedTitle: 'Recommended practices',
  salahDislikedTitle: 'Disliked practices',
  afterPrayerTitle: 'Remembrances after Salah',
  quranDuasTitle: 'Duas from the Quran',
  sunnahDuasTitle: 'Duas from the Sunnah',
  morningAdhkarTitle: 'Morning remembrances',
  eveningAdhkarTitle: 'Evening remembrances',
  fajrTitle: 'Fajr',
  dhuhrTitle: 'Dhuhr',
  asrTitle: 'Asr',
  maghribTitle: 'Maghrib',
  ishaTitle: 'Isha',
  duasTitle: 'Duas',
  favoritesTitle: 'Favorites',
  sectionInPreparation: 'This page is in preparation.',
  homeIntro: 'Your Salah companion',
  homeDescription: 'Choose a section to explore.',
  exploreTitle: 'Explore the guide',
  guideDescription: 'Instructions, illustrations, and texts',
  sourceDescription: 'References, original texts, and translations',
  settingsDescription: 'Choose your language and a comfortable text size.',
  readingPreferences: 'Reading preferences',
  offlineLabel: 'Available offline',
  languagePairLabel: 'Arabic & English',
  draftReviewTitle: 'Draft for review',
  sectionArtworkTitle: 'Preview illustrations',
  sectionArtworkDescription: 'Decorative section images awaiting review. These do not illustrate worship instructions.',
  poseDraftTitle: 'From opening takbir to salam',
  poseDraftDescription: 'Illustration drafts for visual review. These do not specify rak’ah counts or a complete prayer sequence.',
  openPoseDrafts: 'Preview movement illustrations',
  draftFrameLabel: 'Image {current} of {total}',
  previousImage: 'Previous image',
  nextImage: 'Next image',
  allDraftImages: 'All images',

  homeTitle: 'Home',
  settingsTitle: 'Settings',
  openSettings: 'Open settings',
  back: 'Back',
  salahTitle: 'Salah',
  openSalah: 'Browse the Salah guide',
  salahOverviewTitle: 'Overview',
  salahGuideTitle: 'Salah guide',
  openSalahGuide: 'Open guide',
  guideInstructionTitle: 'Instructions',
  guideIllustrationTitle: 'Illustration',
  guideTextTitle: 'Text',
  sourceDetailsTitle: 'Source details',
  openSourceDetails: 'View source details',
  sourceReferenceTitle: 'Reference',
  sourceTextTitle: 'Original text',
  sourceTranslationTitle: 'Translation',

  contentSlotTitle: 'Content in preparation',
  contentSlotNote: 'Content will appear here once it has been approved.',

  languageSection: 'Language',
  languageArabic: 'العربية',
  languageEnglish: 'English',

  textSizeSection: 'Text size',
  textSizeSmall: 'Small',
  textSizeMedium: 'Medium',
  textSizeLarge: 'Large',
  textSizeExtraLarge: 'Extra large',
  textSizeSampleLabel: 'Size preview',

  diagnosticsSection: 'Direction status',
  appliedDirectionLabel: 'Currently applied direction',
  pendingDirectionLabel: 'Direction awaiting restart',
  directionRtl: 'Right to left',
  directionLtr: 'Left to right',

  restartTitle: 'App restart required',
  restartBody:
    'Your new language is saved and its text is showing now, but the layout direction only changes after the app restarts.',
  restartActionNow: 'Restart now',
  restartManualHint: 'Fully close the app and open it again to apply the direction.',
  selectedBadge: 'Selected',
};

export const translations: Record<LanguageCode, Translation> = { ar, en };

export function isSupportedLanguage(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function directionLabel(t: Translation, direction: LayoutDirection): string {
  return direction === 'rtl' ? t.directionRtl : t.directionLtr;
}
