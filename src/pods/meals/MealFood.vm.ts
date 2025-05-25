import { Food } from "@/features/food/models/Food.model";

export interface MealFood extends Food {
  quantity: number;
}