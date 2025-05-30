import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Accordion } from '@/src/components/ui/Accordion';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';
import { MealIngredient } from '../../../MealIngredient.vm';

interface IngredientListProps {
  mealIngredientList: MealIngredient[];
  onRemoveMealIngredient: (ingredient: MealIngredient) => void;
}

export default function IngredientList({
  mealIngredientList,
  onRemoveMealIngredient,
}: IngredientListProps) {
  return (
    <View style={styles.container}>
      {mealIngredientList.map((ingredient) => (
        <Accordion
          key={ingredient.id}
          title={ingredient.name}
          subtitle={`${ingredient.quantity}${ingredient.unit}`}
        >
          <View style={styles.nutritionInfo}>
            <View style={styles.nutritionItem}>
              <ThemedText type="label" style={styles.nutritionLabel}>
                Calorías
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(ingredient.kcal)} kcal
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="label" style={styles.nutritionLabel}>
                Proteínas
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(ingredient.protein)}g
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="label" style={styles.nutritionLabel}>
                Carbos
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(ingredient.carbs)}g
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="label" style={styles.nutritionLabel}>
                Grasas
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(ingredient.fat)}g
              </ThemedText>
            </View>
          </View>
          <Button
            variant="danger"
            size="small"
            title="Eliminar"
            onPress={() => onRemoveMealIngredient(ingredient)}
            style={styles.removeButton}
          />
        </Accordion>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '45%',
  },
  nutritionLabel: {
    marginBottom: 2,
  },
  removeButton: {
    alignSelf: 'flex-end',
  },
});
