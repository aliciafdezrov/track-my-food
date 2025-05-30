import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';
import { ThemedText } from '@/src/components/ThemedText';

export default function IngredientsScreen() {
  const colorScheme = useColorScheme();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/ingredients.jpg')}
          style={styles.logo}
        />
      }
    >
      <ThemedText>Ingredientes</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: '100%',
  },
});
