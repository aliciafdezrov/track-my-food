import { UnsavedMeal } from '../features/meal/models/Meal.model';
import { MealIngredient } from '../pods/meals/MealIngredient.vm';
import { Meal } from '../features/meal/models/Meal.model';
import { calculateNutritionFactsTotal } from './NutritionFacts';

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
    date: new Date().toISOString(),
  };
  return meal;
}

export function groupMealsByDay(meals: Meal[]): Record<string, Meal[]> {
  return meals.reduce(
    (acc, meal) => {
      const date = new Date(meal.date);
      const dayKey = date.toISOString().split('T')[0]; // Obtiene YYYY-MM-DD

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }

      acc[dayKey].push(meal);
      return acc;
    },
    {} as Record<string, Meal[]>,
  );
}

export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  return days[date.getDay()];
}
