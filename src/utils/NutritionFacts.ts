import { NutritionFactsVM } from "../vm/NutritionFacts.vm";

export const calculateNutritionFactsTotal = (
  nutritionFacts: NutritionFactsVM[],
): NutritionFactsVM => {
  return {
    kcal: nutritionFacts.reduce(
      (acc, nutritionFact) => acc + nutritionFact.kcal,
      0,
    ),
    protein: nutritionFacts.reduce(
      (acc, nutritionFact) => acc + nutritionFact.protein,
      0,
    ),
    fat: nutritionFacts.reduce(
      (acc, nutritionFact) => acc + nutritionFact.fat,
      0,
    ),
    carbs: nutritionFacts.reduce(
      (acc, nutritionFact) => acc + nutritionFact.carbs,
      0,
    ),
  };
};
