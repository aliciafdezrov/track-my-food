import React from 'react';
import { Form } from '@/components/ui/Form';
import { UnsavedIngredient } from '@/src/features/ingredient/models/Ingredient.model';

interface AddIngredientProps {
  createIngredient: (ingredient: UnsavedIngredient) => void;
}

export default function AddIngredient({
  createIngredient,
}: AddIngredientProps) {
  const handleSubmit = (data: Record<string, string>) => {
    createIngredient(data as unknown as UnsavedIngredient);
  };

  return (
    <Form
      fields={[
        {
          type: 'text',
          name: 'name',
          label: 'Nombre',
          required: true,
        },
        {
          type: 'number',
          name: 'kcal',
          label: 'Calorías',
          required: true,
        },
        {
          type: 'number',
          name: 'protein',
          label: 'Proteínas',
          required: true,
        },
        {
          type: 'number',
          name: 'carbs',
          label: 'Carbos',
        },
        {
          type: 'number',
          name: 'fat',
          label: 'Grasas',
        },
        {
          type: 'number',
          name: 'portion',
          label: 'Porción',
          required: true,
        },
        {
          type: 'text',
          name: 'notes',
          label: 'Notas',
        },
        {
          type: 'text',
          name: 'unit',
          label: 'Unidad',
        },
      ]}
      onSubmit={handleSubmit}
      submitButtonText="Añadir"
    />
  );
}
