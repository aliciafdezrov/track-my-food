import { SQLiteDatabase } from 'expo-sqlite';
import { UnsavedMeal } from '../models/Meal.model';

export const addMeal = async (
  db: SQLiteDatabase,
  meal: UnsavedMeal,
): Promise<void> => {
  await db.runAsync(
    'INSERT INTO meals (name, kcal, protein, fat, carbs, notes, date) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [
      meal.name,
      meal.kcal,
      meal.protein,
      meal.fat,
      meal.carbs,
      meal.notes,
      meal.date,
    ],
  );
};
