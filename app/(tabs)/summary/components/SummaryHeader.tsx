import { StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function SummaryHeader() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Summary</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Resumen diario/semanal/mensual...</ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
