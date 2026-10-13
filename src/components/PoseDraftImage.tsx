import { Image, StyleSheet, View } from 'react-native';

import type { SalahPoseDraft } from '../content/salahPoseDrafts';
import { colors } from '../design/tokens';

// Keep the unapproved artwork out of production asset dependencies as well as UI.
const atlas = __DEV__ ? require('../../assets/illustrations/salah-draft/pose-atlas.png') : null;

/** A fixed square viewport into the original atlas; no edited/cropped asset files. */
export function PoseDraftImage({ pose, size }: { pose: SalahPoseDraft; size: number }) {
  if (!atlas) return null;
  return (
    <View
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={[styles.viewport, { width: size, height: size }]}
    >
      <Image
        source={atlas}
        resizeMode="stretch"
        fadeDuration={0}
        style={[
          styles.atlas,
          {
            width: size * 3,
            height: size * 3,
            // Physical transforms deliberately do not follow interface direction.
            transform: [
              { translateX: (1 - pose.column) * size },
              { translateY: (1 - pose.row) * size },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
  },
  atlas: { position: 'absolute' },
});
