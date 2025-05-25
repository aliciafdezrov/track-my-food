import { UnsavedMeal } from '../features/meal/models/Meal.model';
import { MealFood } from '../pods/meals/MealFood.vm';

export function getMealFromMealFoodList(
  mealName: string,
  mealFoodList: MealFood[],
  notes: string = '',
): UnsavedMeal {
  const meal: UnsavedMeal = {
    name: mealName,
    kcal: mealFoodList.reduce((acc, food) => acc + food.kcal, 0),
    protein: mealFoodList.reduce((acc, food) => acc + food.protein, 0),
    fat: mealFoodList.reduce((acc, food) => acc + food.fat, 0),
    carbs: mealFoodList.reduce((acc, food) => acc + food.carbs, 0),
    notes,
    date: new Date().toISOString(),
  };
  return meal;
}
