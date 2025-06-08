import { MealIngredient } from '../MealIngredient.vm';
import { Modal } from '@/src/components/ui/Modal';
import React, { useState } from 'react';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';
import IngredientList from './components/ingredientList/IngredientList.component';

interface IngredientContentProps {
  mealIngredientList: MealIngredient[];
  onRemoveMealIngredient: (ingredient: MealIngredient) => void;
  onEditMealIngredient: (ingredient: MealIngredient) => void;
}

export default function IngredientContent({
  mealIngredientList,
  onRemoveMealIngredient,
  onEditMealIngredient,
}: IngredientContentProps) {
  const [ingredientToRemove, setIngredientToRemove] =
    useState<MealIngredient | null>(null);

  const handleClickRemoveMealIngredient = (mealIngredient: MealIngredient) => {
    setIngredientToRemove(mealIngredient);
  };

  const handleOnCloseModal = () => {
    setIngredientToRemove(null);
  };

  const handleOnDelete = () => {
    if (ingredientToRemove) {
      onRemoveMealIngredient(ingredientToRemove);
    }
    handleOnCloseModal();
  };

  const handleClickEditMealIngredient = (mealIngredient: MealIngredient) => {
    onEditMealIngredient(mealIngredient);
  };

  return (
    <>
      <IngredientList
        mealIngredientList={mealIngredientList}
        onRemoveMealIngredient={handleClickRemoveMealIngredient}
        onEditMealIngredient={handleClickEditMealIngredient}
      />
      <Modal
        onClose={handleOnCloseModal}
        visible={ingredientToRemove !== null}
        title="Eliminar ingrediente"
      >
        <ThemedText type="default">
          Eliminar el ingrediente:
          <ThemedText type="defaultSemiBold">
            {ingredientToRemove?.name}
          </ThemedText>{' '}
          de esta comida
        </ThemedText>

        <ThemedView style={styles.footerContainer}>
          <Button
            variant="danger"
            title="Eliminar"
            size="small"
            onPress={handleOnDelete}
          />
          <Button
            variant="default"
            title="Cancelar"
            size="small"
            onPress={handleOnCloseModal}
          />
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
});
