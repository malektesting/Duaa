import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from './tokens';

export function Screen({ children, spacious = false }: { children: ReactNode; spacious?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, spacious && styles.spacious,
        { paddingBottom: spacing.xxxl + insets.bottom,
          paddingHorizontal: spacing.xl + Math.max(insets.left, insets.right) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  spacious: { gap: spacing.xxl },
});
