import { NutritionFactsVM } from "@/src/vm/NutritionFacts.vm";

export interface Meal extends NutritionFactsVM {
  id: number;
  name: string;
  notes: string;
  date: string;
}

export type UnsavedMeal = Omit<Meal, 'id'>;