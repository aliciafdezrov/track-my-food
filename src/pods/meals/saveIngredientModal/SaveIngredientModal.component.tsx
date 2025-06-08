import React, { useEffect, useState } from 'react';
import { Form } from '@/src/components/ui/form/Form.component';
import { Modal } from '@/components/ui/Modal';
import { Ingredient } from '@/src/features/ingredient/models/Ingredient.model';
import { MealIngredient } from '../MealIngredient.vm';
import { calculateFoodValues } from './SaveIngredientModal.helper';
import { useSQLiteContext } from 'expo-sqlite';
import { getIngredients } from '@/src/features/ingredient/services/Database';

interface SaveIngredientModalProps {
  isOpen: boolean;
  title: string;
  defaultValues?: MealIngredient;
  onClose: () => void;
  onSubmit: (mealFood: MealIngredient) => void;
}

export const SaveIngredientModal: React.FC<SaveIngredientModalProps> = ({
  isOpen,
  title,
  defaultValues,
  onClose,
  onSubmit,
}) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const db = useSQLiteContext();

    useEffect(() => {
      const loadIngredients = async () => {
        const result = await getIngredients(db);
        setIngredients(result);
      };

      loadIngredients();
    }, []);

  const handleSubmit = (data: Record<string, string>) => {
    const quantity = parseFloat(data.quantity);
    const selectedIngredient: Ingredient | undefined = ingredients.find(
      (ingredient: any) => ingredient.id === data.ingredient,
    );

    if (selectedIngredient) {
      const { kcal, protein, carbs, fat, portion } = selectedIngredient;

      onSubmit({
        ...selectedIngredient,
        quantity,
        kcal: calculateFoodValues(kcal, portion, quantity),
        protein: calculateFoodValues(protein, portion, quantity),
        carbs: calculateFoodValues(carbs, portion, quantity),
        fat: calculateFoodValues(fat, portion, quantity),
      });
    }
    onClose();
  };

  return (
    <Modal visible={isOpen} onClose={onClose} title={title}>
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
            defaultValue: defaultValues?.id,
          },
          {
            type: 'number',
            name: 'quantity',
            label: 'Cantidad',
            required: true,
            defaultValue: defaultValues?.quantity.toString(),
          },
        ]}
        onSubmit={handleSubmit}
        submitButtonText="Añadir"
      />
    </Modal>
  );
};
