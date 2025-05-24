import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Form } from './ui/Form';
import { Food } from '@/models/Food.model';

interface AddFoodFormProps {
  onSubmit: (food: any) => void;
  foods: Food[];
}

export default function AddFoodForm({ onSubmit, foods }: AddFoodFormProps) {
  const [selectedFood, setSelectedFood] = useState<any>(null);

  const handleSubmit = (data: {food: string, quantity: number}) => {
    console.log(data);
    const selectedFood: Food | undefined = foods.find((food: any) => food.id === data.food);

    if (selectedFood) {
      const kcal = selectedFood.kcal * data.quantity;
      const protein = selectedFood.protein * data.quantity;
      const carbs = selectedFood.carbs * data.quantity;
      const fat = selectedFood.fat * data.quantity;
    }
  }

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meals!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Para añadir todas las comidas</ThemedText>
      <Form fields={[
        {
          type: 'select',
          name: 'food',
          label: 'Alimento',
          options: foods.map((food: any) => ({
            label: food.name,
            value: food.id,
          })),
          required: true,
        },
        {
          type: 'number',
          name: 'quantity',
          label: 'Cantidad',
          required: true,
        }
      ]} onSubmit={handleSubmit} submitButtonText='Añadir'/>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
