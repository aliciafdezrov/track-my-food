import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { getFoods } from '@/features/food/services/Database';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import AddFoodForm from '@/components/addFoodForm/AddFoodForm.component';
import { Food } from '@/features/food/models/Food.model';
import { MealsHeader } from './components/MealsHeader';

export default function MealsScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const loadFoods = async () => {
      const result = await getFoods(db);
      setFoods(result);
    };

    loadFoods();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <MealsHeader />
      <AddFoodForm foods={foods} onSubmit={() => {}} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
