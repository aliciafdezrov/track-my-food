import { UnsavedMeal } from '../features/meal/models/Meal.model';
import { MealIngredient } from '../pods/meals/MealIngredient.vm';
import { Meal } from '../features/meal/models/Meal.model';
import { calculateNutritionFactsTotal } from './NutritionFacts';
import { getCurrentDate, getFormattedDate } from './Date';

export function getMealFromMealFoodList(
  mealName: string,
  mealFoodList: MealIngredient[],
  notes: string = '',
): UnsavedMeal {
  const { kcal, protein, fat, carbs } =
    calculateNutritionFactsTotal(mealFoodList);
  const meal: UnsavedMeal = {
    name: mealName,
    kcal,
    protein,
    fat,
    carbs,
    notes,
    date: getCurrentDate(),
  };
  return meal;
}

export function groupMealsByDay(meals: Meal[]): Record<string, Meal[]> {
  return meals.reduce(
    (acc, meal) => {
      const dayKey = getFormattedDate(meal.date);
      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }

      acc[dayKey].push(meal);
      return acc;
    },
    {} as Record<string, Meal[]>,
  );
}
