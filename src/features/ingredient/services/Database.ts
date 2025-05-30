import { SQLiteDatabase } from 'expo-sqlite';
import { Ingredient } from '../models/Ingredient.model';

export const getIngredients = (db: SQLiteDatabase): Promise<Ingredient[]> => {
  return db.getAllAsync('SELECT * FROM ingredients;');
};
