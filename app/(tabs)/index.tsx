import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFoods } from '@/src/services/Database';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function MealsScreen() {
  const [foods, setFoods] = useState([]);
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meals!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Para añadir todas las comidas</ThemedText>
      {foods.map((food: any) => (
        <ThemedText type="default">{food.name}</ThemedText>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
