import React, { useState } from 'react';
import { Form } from '@/components/ui/Form';
import { calculateFoodValues } from './AddIngredientFormModal.helper';
import { MealIngredient } from '../MealIngredient.vm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Ingredient } from '@/src/features/ingredient/models/Ingredient.model';
import { Keyboard } from 'react-native';

interface AddIngredientFormModalProps {
  addIngredient: (mealFood: MealIngredient) => void;
  ingredients: Ingredient[];
}

export default function AddIngredientFormModal({
  ingredients,
  addIngredient,
}: AddIngredientFormModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (data: Record<string, string>) => {
    const quantity = parseFloat(data.quantity);
    const selectedIngredient: Ingredient | undefined = ingredients.find(
      (food: any) => food.id === data.food,
    );

    if (selectedIngredient) {
      const { kcal, protein, carbs, fat, portion } = selectedIngredient;

      addIngredient({
        ...selectedIngredient,
        quantity,
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
    Keyboard.dismiss();
    setIsOpen(true);
  };

  return (
    <>
      <Modal visible={isOpen} onClose={handleOnClose} title="Añadir alimento">
        <Form
          fields={[
            {
              type: 'select',
              name: 'ingredient',
              label: 'Ingrediente',
              options: ingredients.map((ingredient) => ({
                label: `${ingredient.name} (${ingredient.portion}${ingredient.unit})`,
                value: ingredient.id,
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
        title="Añadir ingrediente"
        onPress={handleOnClickAddFood}
      />
    </>
  );
}
