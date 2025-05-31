import { Meal } from '@/src/features/meal/models/Meal.model';
import { SummaryVM } from './Summary.vm';
import {
  getDayOfWeek,
  groupMealsByDay,
} from '@/src/utils/MealIngredient';
import { calculateNutritionFactsTotal } from '@/src/utils/NutritionFacts';

const mapMealToSummary = (meal: Meal): SummaryVM => {
  return {
    title: meal.name,
    subtitle: meal.notes,
    kcal: meal.kcal,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
  };
};

export const mapMealListToSummaryList = (meals: Meal[]): SummaryVM[] => {
  return meals.map(mapMealToSummary);
};

export const mapWeeklyMealListToSummaryList = (meals: Meal[]): SummaryVM[] => {
  const groupedMeals = groupMealsByDay(meals);
  return Object.entries(groupedMeals).map(([date, meals]) => {
    const nutritionFacts = meals.map((meal) => ({
      kcal: meal.kcal,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    }));
    const { kcal, protein, carbs, fat } = calculateNutritionFactsTotal(
      nutritionFacts,
    );
    return {
      title: getDayOfWeek(date),
      subtitle: date,
      kcal,
      protein,
      carbs,
      fat,
    };
  });
};
