import { schema } from '@/database/Schema';
import { SQLiteDatabase } from 'expo-sqlite';
import { Food } from '@/models/Food.model';

export const initDatabase = async (db: SQLiteDatabase): Promise<void> => {
  for (let statement of schema) {
    await db.execAsync(statement);
  }
  
};

export const getFoods = (db: SQLiteDatabase): Promise<Food[]> => {
  return db.getAllAsync('SELECT * FROM foods;');
};
