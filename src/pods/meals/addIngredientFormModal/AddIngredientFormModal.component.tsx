import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Keyboard } from 'react-native';
import { MealIngredient } from '../MealIngredient.vm';
import { SaveIngredientModal } from './SaveIngredientModal.component';

interface AddIngredientFormModalProps {
  defaultValues?: MealIngredient;
  addIngredient: (mealFood: MealIngredient) => void;
}

export default function AddIngredientFormModal({
  defaultValues,
  addIngredient,
}: AddIngredientFormModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnClickAddIngredient = () => {
    Keyboard.dismiss();
    setIsOpen(true);
  };

  return (
    <>
      <SaveIngredientModal
        isOpen={isOpen}
        onClose={handleOnClose}
        onSubmit={addIngredient}
        title="Añadir ingrediente"
        defaultValues={defaultValues}
      />
      <Button
        variant="secondary"
        size="small"
        title="Añadir ingrediente"
        onPress={handleOnClickAddIngredient}
      />
    </>
  );
}
