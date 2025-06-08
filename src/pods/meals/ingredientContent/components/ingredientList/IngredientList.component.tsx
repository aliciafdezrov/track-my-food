import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MealIngredient } from '../../../MealIngredient.vm';
import { IngredientItem } from './ingredientItem/IngredientItem.component';

interface IngredientListProps {
  mealIngredientList: MealIngredient[];
  onRemoveMealIngredient: (ingredient: MealIngredient) => void;
  onEditMealIngredient: (ingredient: MealIngredient) => void;
}

export default function IngredientList({
  mealIngredientList,
  onRemoveMealIngredient,
  onEditMealIngredient,
}: IngredientListProps) {
  return (
    <View style={styles.container}>
      {mealIngredientList.map((ingredient) => (
        <IngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          onRemoveMealIngredient={onRemoveMealIngredient}
          onEditMealIngredient={onEditMealIngredient}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
