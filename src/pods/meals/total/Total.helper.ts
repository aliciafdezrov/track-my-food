import { MealIngredient } from '@/src/pods/meals/MealIngredient.vm';

export const calculateIngredientTotal = (ingredients: MealIngredient[]) => {
  return {
    kcal: ingredients.reduce((acc, food) => acc + food.kcal, 0),
    protein: ingredients.reduce((acc, food) => acc + food.protein, 0),
    fat: ingredients.reduce((acc, food) => acc + food.fat, 0),
    carbs: ingredients.reduce((acc, food) => acc + food.carbs, 0),
  };
};
