import { StyleSheet, Text, View } from 'react-native';
import { useAppPreferences } from '../preferences/AppPreferences';

import { colors } from './tokens';

export type IconName = 'book' | 'source' | 'settings' | 'image' | 'water' | 'bookmark';

/** UI-only symbols drawn natively, with no font or network dependency. */
export function UiIcon({ name, inverse = false }: { name: IconName; inverse?: boolean }) {
  const { appliedDirection } = useAppPreferences();
  const ink = inverse ? colors.forestInk : colors.olive;
  return (
    <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.frame}>
      {name === 'water' ? (
        <View style={[styles.water, { borderColor: ink, transform: [{ rotate: appliedDirection === 'rtl' ? '-45deg' : '45deg' }] }]} />
      ) : name === 'bookmark' ? (
        <Text allowFontScaling={false} style={[styles.star, { color: ink }]}>☆</Text>
      ) : name === 'book' ? (
        <View style={styles.book}><View style={[styles.page, { borderColor: ink }]} /><View style={[styles.page, { borderColor: ink }]} /></View>
      ) : name === 'settings' ? (
        <View style={styles.sliders}>
          {[0, 1, 2].map((index) => <View key={index} style={[styles.slider, { backgroundColor: ink }]}><View style={[styles.knob, { backgroundColor: ink, start: index === 1 ? 13 : 4 }]} /></View>)}
        </View>
      ) : (
        <View style={[styles.document, { borderColor: ink }]}><View style={[styles.rule, { backgroundColor: ink }]} /><View style={[styles.rule, name === 'image' && styles.picture, { backgroundColor: ink }]} /></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  water: { width: 17, height: 17, borderWidth: 1.5, borderRadius: 10, borderTopStartRadius: 1 },
  star: { fontSize: 28, lineHeight: 30, textAlign: 'center' },
  book: { flexDirection: 'row', gap: 2 },
  page: { width: 10, height: 18, borderWidth: 1.5, borderTopStartRadius: 3, borderTopEndRadius: 3 },
  document: { width: 19, height: 23, borderWidth: 1.5, borderRadius: 3, padding: 4, gap: 4, justifyContent: 'center' },
  rule: { height: 1.5, width: '100%' },
  picture: { height: 7 },
  sliders: { width: 23, gap: 7 },
  slider: { height: 1.5, width: '100%' },
  knob: { position: 'absolute', top: -2, height: 6, width: 6, borderRadius: 3 },
});
