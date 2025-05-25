import { SQLiteDatabase } from 'expo-sqlite';
import { Food } from '../models/Food.model';

export const getFoods = (db: SQLiteDatabase): Promise<Food[]> => {
  return db.getAllAsync('SELECT * FROM foods;');
};