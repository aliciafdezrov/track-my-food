
import { DataTable } from '@/src/components/ui/DataTable';
import { MealFood } from '../MealFood.vm';
import { columns } from './FoodTable.constants';

interface FoodTableProps {
  mealFoodList: MealFood[];
}

export default function FoodTable({ mealFoodList }: FoodTableProps) {
  return <DataTable columns={columns} data={mealFoodList} />;
}
