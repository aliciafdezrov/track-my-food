import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Accordion } from '@/src/components/ui/Accordion';
import { MealFood } from '../MealFood.vm';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';

interface FoodListProps {
  mealFoodList: MealFood[];
  onRemoveMealFood: (food: MealFood) => void;
}

export default function FoodList({
  mealFoodList,
  onRemoveMealFood,
}: FoodListProps) {
  return (
    <View style={styles.container}>
      {mealFoodList.map((food) => (
        <Accordion
          key={food.id}
          title={food.name}
          subtitle={`${food.quantity}g`}
        >
          <View style={styles.nutritionInfo}>
            <View style={styles.nutritionItem}>
              <ThemedText type="default" style={styles.nutritionLabel}>
                Calorías
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(food.kcal)} kcal
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="default" style={styles.nutritionLabel}>
                Proteínas
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(food.protein)}g
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="default" style={styles.nutritionLabel}>
                Carbos
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(food.carbs)}g
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="default" style={styles.nutritionLabel}>
                Grasas
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {Math.round(food.fat)}g
              </ThemedText>
            </View>
          </View>
          <Button
            variant="outline"
            size="small"
            title="Eliminar"
            onPress={() => onRemoveMealFood(food)}
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
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  removeButton: {
    alignSelf: 'flex-end',
  },
});
