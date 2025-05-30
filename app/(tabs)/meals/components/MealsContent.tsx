import { getIngredients } from '@/src/features/ingredient/services/Database';
import { useState, useEffect, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Ingredient } from '@/src/features/ingredient/models/Ingredient.model';
import { MealIngredient } from '@/src/pods/meals/MealIngredient.vm';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { StyleSheet } from 'react-native';
import AddIngredientFormModal from '@/src/pods/meals/addIngredientFormModal/AddIngredientFormModal.component';
import { ThemedView } from '@/components/ThemedView';
import { getMealFromMealFoodList } from '@/src/utils/MealIngredient';
import { addMeal } from '@/features/meal/services/Database';
import { Total } from '@/src/pods/meals/total/Total.component';
import IngredientContent from '@/src/pods/meals/ingredientContent/IngredientContent.component';

export function MealsContent() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const db = useSQLiteContext();
  const [selectedIngredients, setSelectedIngredients] = useState<
    MealIngredient[]
  >([]);
  const [mealName, setMealName] = useState<string>('');

  useEffect(() => {
    const loadIngredients = async () => {
      const result = await getIngredients(db);
      setIngredients(result);
    };

    loadIngredients();
  }, []);

  const handleAddMealIngredient = (mealIngredient: MealIngredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, mealIngredient]);
  };

  const handleChangeName = (name: string) => {
    setMealName(name);
  };

  const disableSaveButton = useMemo(() => {
    return mealName.length === 0 || selectedIngredients.length === 0;
  }, [mealName, selectedIngredients]);

  const onSave = () => {
    const meal = getMealFromMealFoodList(mealName, selectedIngredients);
    addMeal(db, meal);
    setSelectedIngredients([]);
    setMealName('');
  };

  const handleRemoveMealIngredient = (mealIngredient: MealIngredient) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== mealIngredient.id),
    );
  };

  const handleClear = () => {
    setSelectedIngredients([]);
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
      <AddIngredientFormModal
        ingredients={ingredients}
        addIngredient={handleAddMealIngredient}
      />
      <IngredientContent
        mealIngredientList={selectedIngredients}
        onRemoveMealIngredient={handleRemoveMealIngredient}
      />
      <Total ingredients={selectedIngredients} />

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
});
