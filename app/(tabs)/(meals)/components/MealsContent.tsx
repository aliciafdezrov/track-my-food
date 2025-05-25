import { getFoods } from '@/features/food/services/Database';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import AddFoodForm from '@/pods/meals/addFoodForm/AddFoodForm.component';
import { Food } from '@/features/food/models/Food.model';
import { MealFood } from '@/src/pods/meals/MealFood.vm';
import FoodTable from '@/src/pods/meals/foodTable/FoodTable.component';

export function MealsContent() {
  const [foods, setFoods] = useState<Food[]>([]);
  const db = useSQLiteContext();
  const [selectedFoods, setSelectedFoods] = useState<MealFood[]>([]);

  useEffect(() => {
    const loadFoods = async () => {
      const result = await getFoods(db);
      setFoods(result);
    };

    loadFoods();
  }, []);

  const handleAddMealFood = (mealFood: MealFood) => {
    setSelectedFoods((prevFoods) => [...prevFoods, mealFood]);
  };

  return (
    <>
      <AddFoodForm foods={foods} addSelectedFood={handleAddMealFood} />
      <FoodTable mealFoodList={selectedFoods} />
    </>
  );
}
