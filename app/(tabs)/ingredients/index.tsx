import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IngredientsContent } from './components/IngredientsContent';

export default function IngredientsScreen() {
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
      <IngredientsContent />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: '100%',
  },
});
