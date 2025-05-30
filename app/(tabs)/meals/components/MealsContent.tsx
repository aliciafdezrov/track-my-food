import { getFoods } from '@/features/food/services/Database';
import { useState, useEffect, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Food } from '@/features/food/models/Food.model';
import { MealFood } from '@/pods/meals/MealFood.vm';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { Keyboard, StyleSheet } from 'react-native';
import AddFoodFormModal from '@/pods/meals/addFoodFormModal/AddFoodFormModal.component';
import { ThemedView } from '@/components/ThemedView';
import FoodContent from '@/pods/meals/foodContent/FoodContent.component';
import { getMealFromMealFoodList } from '@/src/utils/MealFood';
import { addMeal } from '@/features/meal/services/Database';
import { ThemedText } from '@/src/components/ThemedText';

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
    const meal = getMealFromMealFoodList(mealName, selectedFoods);
    addMeal(db, meal);
    setSelectedFoods([]);
    setMealName('');
  };

  const handleRemoveMealFood = (mealFood: MealFood) => {
    setSelectedFoods((prevFoods) =>
      prevFoods.filter((food) => food.id !== mealFood.id),
    );
  };

  const handleClear = () => {
    setSelectedFoods([]);
    setMealName('');
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
      <ThemedView style={styles.totalContainer}>
        <ThemedText type="defaultSemiBold">Total</ThemedText>
        <ThemedText>
          {selectedFoods.reduce((acc, food) => acc + food.kcal, 0)} kcal
        </ThemedText>
        <ThemedText>
          {selectedFoods.reduce((acc, food) => acc + food.protein, 0)}{' '}
          protein(g)
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.footerContainer}>
        <Button
          variant="outline"
          size="medium"
          title="Borrar todo"
          onPress={handleClear}
          style={styles.button}
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
    marginBottom: 32,
  },
  footerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
