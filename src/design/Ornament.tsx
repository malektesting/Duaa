import { StyleSheet, View } from 'react-native';

import { colors } from './tokens';

/** Abstract, decorative geometry only. Never a physical prayer instruction. */
export function Ornament() {
  return (
    <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none" style={styles.canvas}>
      <View style={styles.halo} />
      <View style={styles.outerArch}><View style={styles.innerArch}><View style={styles.centerArch} /></View></View>
      <View style={styles.diamond} />
      <View style={styles.horizon} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: { height: 174, width: '100%', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' },
  halo: { position: 'absolute', top: 12, width: 156, height: 156, borderRadius: 78, backgroundColor: colors.olive },
  outerArch: { width: 128, height: 152, borderTopStartRadius: 70, borderTopEndRadius: 70, borderWidth: 1, borderColor: colors.ornament, padding: 13, paddingBottom: 0 },
  innerArch: { flex: 1, borderTopStartRadius: 56, borderTopEndRadius: 56, borderWidth: 1, borderColor: colors.ornament, padding: 13, paddingBottom: 0 },
  centerArch: { flex: 1, borderTopStartRadius: 40, borderTopEndRadius: 40, borderWidth: 1, borderColor: colors.ornament },
  diamond: { position: 'absolute', top: 4, width: 8, height: 8, backgroundColor: colors.ornament, transform: [{ rotate: '45deg' }] },
  horizon: { width: 208, height: 1, backgroundColor: colors.ornament },
});
