import { SQLiteDatabase } from 'expo-sqlite';
import { schema } from '../database/Schema';

export const initDatabase = async (db: SQLiteDatabase): Promise<void> => {
  // Eliminar tablas existentes
  //await db.execAsync('DROP TABLE IF EXISTS meals;');

  // Crear tablas con el nuevo esquema
  for (let statement of schema) {
    await db.execAsync(statement);
  }
};
