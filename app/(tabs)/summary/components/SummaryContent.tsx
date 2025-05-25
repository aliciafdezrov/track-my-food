import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { Meal } from '@/src/features/meal/models/Meal.model';
import { getMeals } from '@/src/features/meal/services/Database';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';

export function SummaryContent() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const loadMeals = async () => {
      const result = await getMeals(db);
      console.log({result});
      setMeals(result);
    };

    loadMeals();
  }, []);

  return (
    <ThemedView>
      {meals.map((meal) => (
        <>
          <ThemedText>{meal.name}</ThemedText>
          <ThemedText>{meal.kcal}</ThemedText>
          <ThemedText>{meal.protein}</ThemedText>
          <ThemedText>{meal.fat}</ThemedText>
          <ThemedText>{meal.carbs}</ThemedText>
          <ThemedText>{meal.notes}</ThemedText>
          <ThemedText>{meal.date}</ThemedText>
        </>
      ))}
    </ThemedView>
  );
}
