import { Column } from "@/components/ui/DataTable";
import { MealFood } from "./AddFoodForm.model";

export const columns: Column<MealFood>[] = [
  {
    key: 'name',
    title: 'Alimento',
    width: 150,
  },
  {
    key: 'quantity',
    title: 'Cantidad',
    width: 100,
  },
  {
    key: 'kcal',
    title: 'Calorías',
    width: 100,
  },
  {
    key: 'protein',
    title: 'Proteínas',
  },
];