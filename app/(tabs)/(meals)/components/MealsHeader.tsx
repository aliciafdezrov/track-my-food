import { StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function MealsHeader() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meals!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Para añadir todas las comidas</ThemedText>
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
