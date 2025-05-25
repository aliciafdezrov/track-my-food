import { SQLiteDatabase } from 'expo-sqlite';
import { Meal, UnsavedMeal } from '../models/Meal.model';

export const addMeal = async (
  db: SQLiteDatabase,
  meal: UnsavedMeal,
): Promise<void> => {
  try {
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
  } catch {
    console.error('Something failed on insert');
  }
};

export const getMeals = (db: SQLiteDatabase): Promise<Meal[]> => {
  return db.getAllAsync('SELECT * FROM meals;');
};
