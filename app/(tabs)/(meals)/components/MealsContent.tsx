import { getFoods } from '@/features/food/services/Database';
import { useState, useEffect, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import AddFoodForm from '@/pods/meals/addFoodForm/AddFoodForm.component';
import { Food } from '@/features/food/models/Food.model';
import { MealFood } from '@/src/pods/meals/MealFood.vm';
import FoodTable from '@/src/pods/meals/foodTable/FoodTable.component';
import { TextInput } from '@/src/components/ui/TextInput';
import { Button } from '@/src/components/ui/Button';
import { StyleSheet } from 'react-native';

export function MealsContent() {
  const [foods, setFoods] = useState<Food[]>([]);
  const db = useSQLiteContext();
  const [selectedFoods, setSelectedFoods] = useState<MealFood[]>([]);
  const [mealName, setMealName] = useState<string>('');

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

  const handleChangeName = (name: string) => {
    setMealName(name);
  };

  const disableSaveButton = useMemo(() => {
    return mealName.length === 0 || selectedFoods.length === 0;
  }, [mealName, selectedFoods]);

  const onSave = () => {
    console.log('save');
  };

  return (
    <>
      <TextInput
        label="Nombre comida"
        value={mealName}
        onChangeText={handleChangeName}
      />
      <AddFoodForm foods={foods} addSelectedFood={handleAddMealFood} />
      <FoodTable mealFoodList={selectedFoods} />
      <Button
        variant="primary"
        size="large"
        title="Guardar"
        onPress={onSave}
        style={styles.button}
        disabled={disableSaveButton}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
  },
});
