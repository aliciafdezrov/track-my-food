import { UnsavedMeal } from '../features/meal/models/Meal.model';
import { MealIngredient } from '../pods/meals/MealIngredient.vm';

export const calculateIngredientTotal = (ingredients: MealIngredient[]) => {
  return {
    kcal: ingredients.reduce((acc, ingredient) => acc + ingredient.kcal, 0),
    protein: ingredients.reduce(
      (acc, ingredient) => acc + ingredient.protein,
      0,
    ),
    fat: ingredients.reduce((acc, ingredient) => acc + ingredient.fat, 0),
    carbs: ingredients.reduce((acc, ingredient) => acc + ingredient.carbs, 0),
  };
};

export function getMealFromMealFoodList(
  mealName: string,
  mealFoodList: MealIngredient[],
  notes: string = '',
): UnsavedMeal {
  const { kcal, protein, fat, carbs } = calculateIngredientTotal(mealFoodList);
  const meal: UnsavedMeal = {
    name: mealName,
    kcal,
    protein,
    fat,
    carbs,
    notes,
    date: new Date().toISOString(),
  };
  return meal;
}
