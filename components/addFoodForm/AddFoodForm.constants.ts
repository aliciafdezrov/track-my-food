import { Column } from "@/components/ui/DataTable";
import { MealFood } from "./AddFoodForm.model";

export const columns: Column<MealFood>[] = [
  {
    key: 'name',
    title: 'Alimento',
  },
  {
    key: 'quantity',
    title: 'Cantidad',
  },
  {
    key: 'kcal',
    title: 'Calorías',
  },
  {
    key: 'protein',
    title: 'Proteínas',
  },
];