import { addIngredient } from '@/src/features/ingredient/services/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { UnsavedIngredient } from '@/src/features/ingredient/models/Ingredient.model';
import AddIngredient from '@/src/pods/ingredients/addIngredient/AddIngredient.component';

export function IngredientsContent() {
  const db = useSQLiteContext();

  const onSave = (ingredient: UnsavedIngredient) => {
    addIngredient(db, ingredient);
  };

  return <AddIngredient createIngredient={onSave} />;
}
