import { MealFood } from "@/pods/meals/MealFood.vm";

export const calculateIngredientTotal = (ingredients: MealFood[]) => {
  return {
    kcal: ingredients.reduce((acc, food) => acc + food.kcal, 0),
    protein: ingredients.reduce((acc, food) => acc + food.protein, 0),
    fat: ingredients.reduce((acc, food) => acc + food.fat, 0),
    carbs: ingredients.reduce((acc, food) => acc + food.carbs, 0),
  };
};