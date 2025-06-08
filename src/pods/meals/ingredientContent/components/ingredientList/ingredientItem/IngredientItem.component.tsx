import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Accordion } from '@/src/components/ui/Accordion';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';
import { SaveIngredientModal } from '@/src/pods/meals/addIngredientFormModal/SaveIngredientModal.component';
import { MealIngredient } from '@/src/pods/meals/MealIngredient.vm';

interface IngredientItemProps {
  ingredient: MealIngredient;
  onRemoveMealIngredient: (ingredient: MealIngredient) => void;
  onEditMealIngredient: (ingredient: MealIngredient) => void;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  ingredient,
  onRemoveMealIngredient,
  onEditMealIngredient,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnEdit = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <>
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

        <View style={styles.buttonContainer}>
          <Button
            variant="secondary"
            size="small"
            onPress={handleOnEdit}
            icon="edit"
          />
          <Button
            variant="danger"
            size="small"
            onPress={() => onRemoveMealIngredient(ingredient)}
            icon="delete"
          />
        </View>
      </Accordion>
      <SaveIngredientModal
        isOpen={isOpen}
        onClose={handleOnClose}
        onSubmit={onEditMealIngredient}
        title="Editar ingrediente"
        defaultValues={ingredient}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
});
