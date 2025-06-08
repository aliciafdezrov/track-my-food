import { useState, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
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
  const db = useSQLiteContext();
  const [selectedIngredients, setSelectedIngredients] = useState<
    MealIngredient[]
  >([]);
  const [mealName, setMealName] = useState<string>('');
  const [mealDescription, setMealDescription] = useState<string>('');

  const handleAddMealIngredient = (mealIngredient: MealIngredient) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      mealIngredient,
    ]);
  };

  const handleChangeName = (name: string) => {
    setMealName(name);
  };

  const handleChangeDescription = (description: string) => {
    setMealDescription(description);
  };

  const disableSaveButton = useMemo(() => {
    return mealName.length === 0 || selectedIngredients.length === 0;
  }, [mealName, selectedIngredients]);

  const onSave = () => {
    const meal = getMealFromMealFoodList(
      mealName,
      selectedIngredients,
      mealDescription,
    );
    addMeal(db, meal);
    handleClear();
  };

  const handleRemoveMealIngredient = (mealIngredient: MealIngredient) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => ingredient.id !== mealIngredient.id,
      ),
    );
  };

  const handleEditMealIngredient = (mealIngredient: MealIngredient) => {
    setSelectedIngredients((prevIngredients) => {
      const index = prevIngredients.findIndex(
        (ingredient) => ingredient.id === mealIngredient.id,
      );
      if (index !== -1) {
        const newIngredients = [...prevIngredients];
        newIngredients[index] = mealIngredient;
        return newIngredients;
      }
      return prevIngredients;
    });
  };

  const handleClear = () => {
    setSelectedIngredients([]);
    setMealName('');
    setMealDescription('');
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Añadir comida"
        value={mealName}
        onChangeText={handleChangeName}
        inputStyle={styles.nameInput}
      />
      <TextInput
        placeholder="Descripción"
        value={mealDescription}
        onChangeText={handleChangeDescription}
      />

      <AddIngredientFormModal addIngredient={handleAddMealIngredient} />
      <IngredientContent
        mealIngredientList={selectedIngredients}
        onRemoveMealIngredient={handleRemoveMealIngredient}
        onEditMealIngredient={handleEditMealIngredient}
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
