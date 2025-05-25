import { getFoods } from '@/features/food/services/Database';
import { useState, useEffect, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Food } from '@/features/food/models/Food.model';
import { MealFood } from '@/src/pods/meals/MealFood.vm';
import { TextInput } from '@/src/components/ui/TextInput';
import { Button } from '@/src/components/ui/Button';
import { StyleSheet } from 'react-native';
import AddFoodFormModal from '@/pods/meals/addFoodFormModal/AddFoodFormModal.component';
import { ThemedView } from '@/src/components/ThemedView';
import FoodContent from '@/pods/meals/foodContent/FoodContent.component';

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

  const handleRemoveMealFood = (mealFood: MealFood) => {
    setSelectedFoods((prevFoods) =>
      prevFoods.filter((food) => food.id !== mealFood.id),
    );
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Añadir comida"
        value={mealName}
        onChangeText={handleChangeName}
        inputStyle={styles.nameInput}
      />
      <AddFoodFormModal foods={foods} addSelectedFood={handleAddMealFood} />
      <FoodContent
        mealFoodList={selectedFoods}
        onRemoveMealFood={handleRemoveMealFood}
      />
      <Button
        variant="primary"
        size="medium"
        title="Guardar"
        onPress={onSave}
        style={styles.button}
        disabled={disableSaveButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  nameInput: {
    backgroundColor: 'inherit',
    borderColor: 'transparent',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
