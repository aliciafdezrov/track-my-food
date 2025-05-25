import { DataTable } from '@/src/components/ui/DataTable';
import { MealFood } from '../MealFood.vm';
import { columns } from './FoodTable.constants';
import { Modal } from '@/src/components/ui/Modal';
import { useState } from 'react';
import { ThemedText } from '@/src/components/ThemedText';
import { Button } from '@/src/components/ui/Button';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';

interface FoodTableProps {
  mealFoodList: MealFood[];
  onRemoveMealFood: (food: MealFood) => void;
}

export default function FoodTable({
  mealFoodList,
  onRemoveMealFood,
}: FoodTableProps) {
  const [foodToRemove, setFoodToRemove] = useState<MealFood | null>(null);

  const handleRowPress = (foodMeal: MealFood) => {
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
      <DataTable
        columns={columns}
        data={mealFoodList}
        onRowPress={handleRowPress}
      />
      <Modal
        onClose={handleOnCloseModal}
        visible={foodToRemove !== null}
        title="Eliminar alimento"
      >
        <ThemedText type="default">
          Eliminar el alimento de esta comida
        </ThemedText>

        <ThemedView style={styles.footerContainer}>
          <Button variant="primary" title="Eliminar" onPress={handleOnDelete} />
          <Button
            variant="outline"
            title="Cancelar"
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
  },
});
