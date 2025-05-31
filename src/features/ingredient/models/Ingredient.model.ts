import { NutritionFactsVM } from "@/src/vm/NutritionFacts.vm";

export interface Ingredient extends NutritionFactsVM {
  id: string;
  name: string;
  portion: number;
  notes: string;
  unit: string;
}

export type UnsavedIngredient = Omit<Ingredient, 'id'>;
