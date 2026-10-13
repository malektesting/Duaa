import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationLink } from '../../components/NavigationLink';
import { PendingContent } from '../../components/PendingContent';
import { PoseDraftImage } from '../../components/PoseDraftImage';
import { RestartBanner } from '../../components/RestartBanner';
import { ScreenHeading } from '../../components/ScreenHeading';
import { SALAH_POSE_DRAFTS } from '../../content/salahPoseDrafts';
import { Screen } from '../../design/Screen';
import { colors, layout, motion, radius, scaledType, spacing, typography } from '../../design/tokens';
import { PENDING_VERIFICATION } from '../../localization/translations';
import { useAppPreferences } from '../../preferences/AppPreferences';

/** Unverified drawings can be reviewed in development, never shown in release UI. */
export default function SalahStepsRoute() {
  return __DEV__ ? <DraftViewer /> : <PendingViewer />;
}

function PendingViewer() {
  const { t } = useAppPreferences();
  return (
    <Screen spacious>
      <RestartBanner />
      <PendingContent title={t.guideIllustrationTitle} />
      <NavigationLink href="/salah/guide" label={t.openSalahGuide} variant="secondary" />
    </Screen>
  );
}

function DraftViewer() {
  const { t, scale, language } = useAppPreferences();
  const [index, setIndex] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const thumbnails = useRef<ScrollView>(null);
  const positions = useRef<Record<number, number>>({});
  const pose = SALAH_POSE_DRAFTS[index];
  const number = (value: number) => value.toLocaleString(language);
  const frameLabel = (value: number) => t.draftFrameLabel
    .replace('{current}', number(value + 1))
    .replace('{total}', number(SALAH_POSE_DRAFTS.length));

  const select = (next: number) => {
    const bounded = Math.min(SALAH_POSE_DRAFTS.length - 1, Math.max(0, next));
    setIndex(bounded);
    const x = positions.current[bounded];
    if (x !== undefined) thumbnails.current?.scrollTo({ x: Math.max(0, x - spacing.lg), animated: false });
  };

  return (
    <Screen spacious>
      <RestartBanner />
      <ScreenHeading eyebrow={t.draftReviewTitle} title={t.poseDraftTitle} description={t.poseDraftDescription} />

      <View style={styles.stage}>
        <View style={styles.stageHeader}>
          <Text style={[styles.status, scaledType('label', scale)]}>{PENDING_VERIFICATION}</Text>
          <Text accessibilityLiveRegion="polite" style={[styles.counter, scaledType('label', scale)]}>
            {frameLabel(index)}
          </Text>
        </View>
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={`${frameLabel(index)}. ${PENDING_VERIFICATION}`}
          onLayout={(event) => setImageSize(Math.min(event.nativeEvent.layout.width, 460))}
          style={styles.imageArea}
        >
          {imageSize > 0 ? <PoseDraftImage pose={pose} size={imageSize} /> : null}
        </View>
      </View>

      <View style={styles.controls}>
        <FrameButton label={t.previousImage} disabled={index === 0} onPress={() => select(index - 1)} />
        <FrameButton label={t.nextImage} disabled={index === SALAH_POSE_DRAFTS.length - 1} onPress={() => select(index + 1)} primary />
      </View>

      <Text accessibilityRole="header" style={[styles.sectionTitle, scaledType('heading', scale)]}>{t.allDraftImages}</Text>
      <ScrollView
        ref={thumbnails}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.thumbnails}
      >
        {SALAH_POSE_DRAFTS.map((item, itemIndex) => (
          <Pressable
            key={item.id}
            onLayout={(event) => { positions.current[itemIndex] = event.nativeEvent.layout.x; }}
            accessibilityRole="button"
            accessibilityLabel={frameLabel(itemIndex)}
            accessibilityState={{ selected: itemIndex === index }}
            onPress={() => select(itemIndex)}
            style={({ pressed }) => [styles.thumbnail, itemIndex === index && styles.selected, pressed && styles.pressed]}
          >
            <PoseDraftImage pose={item} size={76} />
            <Text style={[styles.thumbnailNumber, scaledType('label', scale)]}>
              {number(itemIndex + 1)}{itemIndex === index ? ' •' : ''}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <PendingContent title={t.guideInstructionTitle} />
      <NavigationLink href="/salah/guide" label={t.openSalahGuide} variant="secondary" />
    </Screen>
  );
}

function FrameButton({ label, disabled, onPress, primary = false }: {
  label: string;
  disabled: boolean;
  onPress: () => void;
  primary?: boolean;
}) {
  const { scale } = useAppPreferences();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, primary && styles.primary, disabled && styles.disabled, pressed && styles.pressed]}
    >
      <Text style={[styles.buttonLabel, primary && styles.primaryLabel, disabled && styles.disabledLabel, scaledType('body', scale)]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stage: { backgroundColor: colors.canvas, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  stageHeader: { padding: spacing.lg, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, backgroundColor: colors.surface },
  status: { color: colors.mutedInk, writingDirection: 'auto', flexShrink: 1 },
  counter: { color: colors.olive, writingDirection: 'auto', fontWeight: typography.weight.medium },
  imageArea: { alignItems: 'center', minHeight: 180 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  button: { flexGrow: 1, flexBasis: 130, minHeight: layout.touchMinHeight, padding: spacing.lg, borderRadius: radius.control, borderWidth: 1, borderColor: colors.olive, backgroundColor: colors.surface, justifyContent: 'center' },
  primary: { backgroundColor: colors.olive },
  disabled: { backgroundColor: colors.oliveTint, borderColor: colors.border },
  buttonLabel: { color: colors.olive, fontWeight: typography.weight.medium, textAlign: 'center', writingDirection: 'auto' },
  primaryLabel: { color: colors.white },
  disabledLabel: { color: colors.mutedInk },
  sectionTitle: { color: colors.ink, fontWeight: typography.weight.medium, writingDirection: 'auto' },
  thumbnails: { gap: spacing.md, paddingBottom: spacing.sm },
  thumbnail: { borderWidth: 2, borderColor: colors.border, borderRadius: radius.control, backgroundColor: colors.surface, padding: spacing.xs, gap: spacing.xs, alignItems: 'center', overflow: 'hidden' },
  selected: { borderColor: colors.olive, backgroundColor: colors.oliveTint },
  pressed: { opacity: motion.pressOpacity },
  thumbnailNumber: { color: colors.ink, fontWeight: typography.weight.medium, textAlign: 'center' },
});
