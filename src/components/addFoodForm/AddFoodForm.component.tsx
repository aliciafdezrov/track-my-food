import { StyleSheet } from 'react-native';

import { useState } from 'react';
import { Form } from '@/components/ui/Form';
import { Food } from '@/models/Food.model';
import { DataTable } from '@/components/ui/DataTable';
import { calculateFoodValues } from './AddFoodForm.helper';
import { columns } from './AddFoodForm.constants';
import { MealFood } from './AddFoodForm.model';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface AddFoodFormProps {
  onSubmit: (food: any) => void;
  foods: Food[];
}

export default function AddFoodForm({ onSubmit, foods }: AddFoodFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFoods, setSelectedFoods] = useState<MealFood[]>([]);

  const handleSubmit = (data: { food: string; quantity: number }) => {
    const { quantity } = data;
    const selectedFood: Food | undefined = foods.find(
      (food: any) => food.id === data.food,
    );

    if (selectedFood) {
      const { kcal, protein, carbs, fat, portion } = selectedFood;

      setSelectedFoods((prevFoods) => [
        ...prevFoods,
        {
          ...selectedFood,
          quantity: data.quantity,
          kcal: calculateFoodValues(kcal, portion, quantity),
          protein: calculateFoodValues(protein, portion, quantity),
          carbs: calculateFoodValues(carbs, portion, quantity),
          fat: calculateFoodValues(fat, portion, quantity),
        },
      ]);
    }
    handleOnClose();
  };

  const handleOnClose = () => {
    setIsOpen(false);
  }

  const handleOnClickAddFood = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Modal visible={isOpen} onClose={handleOnClose} title='Añadir alimento' >
        <Form
          fields={[
            {
              type: 'select',
              name: 'food',
              label: 'Alimento',
              options: foods.map((food) => ({
                label: `${food.name} (${food.portion}g)`,
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
      <Button variant="secondary" size='small' title='Añadir comida' onPress={handleOnClickAddFood}/>
      <DataTable columns={columns} data={selectedFoods} />
    </>
  );
}
