import { useState } from 'react';
import { Form } from '@/components/ui/Form';
import { calculateFoodValues } from './AddFoodFormModal.helper';
import { MealFood } from '../MealFood.vm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Food } from '@/src/features/food/models/Food.model';

interface AddFoodFormModalProps {
  addSelectedFood: (mealFood: MealFood) => void;
  foods: Food[];
}

export default function AddFoodFormModal({
  foods,
  addSelectedFood,
}: AddFoodFormModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (data: { food: string; quantity: number }) => {
    const { quantity } = data;
    const selectedFood: Food | undefined = foods.find(
      (food: any) => food.id === data.food,
    );

    if (selectedFood) {
      const { kcal, protein, carbs, fat, portion } = selectedFood;

      addSelectedFood({
        ...selectedFood,
        quantity: data.quantity,
        kcal: calculateFoodValues(kcal, portion, quantity),
        protein: calculateFoodValues(protein, portion, quantity),
        carbs: calculateFoodValues(carbs, portion, quantity),
        fat: calculateFoodValues(fat, portion, quantity),
      });
    }
    handleOnClose();
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnClickAddFood = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Modal visible={isOpen} onClose={handleOnClose} title="Añadir alimento">
        <Form
          fields={[
            {
              type: 'select',
              name: 'food',
              label: 'Alimento',
              options: foods.map((food) => ({
                label: `${food.name} (${food.portion}${food.unit})`,
                value: food.id,
              })),
              required: true,
            },
            {
              type: 'number',
              name: 'quantity',
              label: 'Cantidad',
              required: true,
            },
          ]}
          onSubmit={handleSubmit}
          submitButtonText="Añadir"
        />
      </Modal>
      <Button
        variant="secondary"
        size="small"
        title="Añadir comida"
        onPress={handleOnClickAddFood}
      />
    </>
  );
}
