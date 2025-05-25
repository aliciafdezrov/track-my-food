import { Column } from '@/components/ui/DataTable';
import { MealFood } from '../MealFood.vm';

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
