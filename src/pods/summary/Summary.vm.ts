import { NutritionFactsVM } from "@/src/vm/NutritionFacts.vm";

export interface SummaryVM extends NutritionFactsVM {
  title: string;
  subtitle: string;
}