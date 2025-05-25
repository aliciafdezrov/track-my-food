import { Food } from "@/src/models/Food.model";

export interface MealFood extends Food {
  quantity: number;
}