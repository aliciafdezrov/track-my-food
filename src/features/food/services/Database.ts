import { SQLiteDatabase } from 'expo-sqlite';
import { schema } from '../database/Schema';
import { Food } from '../models/Food.model';

export const initDatabase = async (db: SQLiteDatabase): Promise<void> => {
  // Eliminar tablas existentes
  await db.execAsync('DROP TABLE IF EXISTS foods;');
  await db.execAsync('DROP TABLE IF EXISTS meals;');

  // Crear tablas con el nuevo esquema
  for (let statement of schema) {
    await db.execAsync(statement);
  }
};

export const getFoods = (db: SQLiteDatabase): Promise<Food[]> => {
  return db.getAllAsync('SELECT * FROM foods;');
};
