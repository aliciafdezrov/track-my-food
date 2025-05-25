import { MealFood } from '../MealFood.vm';
import { Modal } from '@/src/components/ui/Modal';
import React, { useState } from 'react';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';
import FoodList from './components/foodList/FoodList.component';

interface FoodContentProps {
  mealFoodList: MealFood[];
  onRemoveMealFood: (food: MealFood) => void;
}

export default function FoodContent({
  mealFoodList,
  onRemoveMealFood,
}: FoodContentProps) {
  const [foodToRemove, setFoodToRemove] = useState<MealFood | null>(null);

  const handleClickRemoveMealFood = (foodMeal: MealFood) => {
    setFoodToRemove(foodMeal);
  };

  const handleOnCloseModal = () => {
    setFoodToRemove(null);
  };

  const handleOnDelete = () => {
    if (foodToRemove) {
      onRemoveMealFood(foodToRemove);
    }
    handleOnCloseModal();
  };

  return (
    <>
      <FoodList
        mealFoodList={mealFoodList}
        onRemoveMealFood={handleClickRemoveMealFood}
      />
      <Modal
        onClose={handleOnCloseModal}
        visible={foodToRemove !== null}
        title="Eliminar alimento"
      >
        <ThemedText type="default">
          Eliminar el alimento:{' '}
          <ThemedText type="defaultSemiBold">{foodToRemove?.name}</ThemedText>{' '}
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
