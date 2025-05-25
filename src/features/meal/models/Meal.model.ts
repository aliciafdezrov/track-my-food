export interface Meal {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  notes: string;
  date: string;
}

export type UnsavedMeal = Omit<Meal, 'id'>;