import { SQLiteDatabase } from 'expo-sqlite';
import { Ingredient, UnsavedIngredient } from '../models/Ingredient.model';

export const getIngredients = (db: SQLiteDatabase): Promise<Ingredient[]> => {
  return db.getAllAsync('SELECT * FROM ingredients;');
};

export const addIngredient = async (
  db: SQLiteDatabase,
  ingredient: UnsavedIngredient,
): Promise<void> => {
  try {
    await db.runAsync(
      'INSERT INTO ingredients (name, kcal, protein, fat, carbs, notes, portion, unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      [ingredient.name, ingredient.kcal, ingredient.protein, ingredient.fat, ingredient.carbs, ingredient.notes, ingredient.portion, ingredient.unit],
    );
  } catch {
    console.error('Something failed on insert');
  }
};
