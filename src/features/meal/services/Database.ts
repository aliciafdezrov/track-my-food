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

export const getTodayMeals = (db: SQLiteDatabase): Promise<Meal[]> => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).toISOString();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  ).toISOString();

  return db.getAllAsync('SELECT * FROM meals WHERE date BETWEEN ? AND ?;', [
    startOfDay,
    endOfDay,
  ]);
};

export const getCurrentWeekMeals = (db: SQLiteDatabase): Promise<Meal[]> => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Establece al inicio de la semana (domingo)
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Establece al final de la semana (sábado)
  endOfWeek.setHours(23, 59, 59, 999);

  return db.getAllAsync(
    'SELECT * FROM meals WHERE date BETWEEN ? AND ? ORDER BY date ASC;',
    [startOfWeek.toISOString(), endOfWeek.toISOString()],
  );
};
