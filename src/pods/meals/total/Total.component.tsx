import { MealFood } from '@/pods/meals/MealFood.vm';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { calculateIngredientTotal } from './Total.helper';

interface TotalProps {
  ingredients: MealFood[];
}

export function Total({ ingredients }: TotalProps) {
  const { kcal, protein, fat, carbs } = calculateIngredientTotal(ingredients);

  const column = (label: string, value: number) => (
    <ThemedView style={styles.column}>
      <ThemedText type="label">{label}</ThemedText>
      <ThemedText type="defaultSemiBold">{value}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold">Total</ThemedText>

      <ThemedView style={styles.content}>
        {column('Kcal', kcal)}

        {column('Proteínas', protein)}

        {column('Grasas', fat)}

        {column('Carbohidratos', carbs)}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 40,
    gap: 2,
  },
});
