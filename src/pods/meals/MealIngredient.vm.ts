import { Ingredient } from '@/src/features/ingredient/models/Ingredient.model';

export interface MealIngredient extends Ingredient {
  quantity: number;
}
