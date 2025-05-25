import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { MealsContent } from './components/MealsContent';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';

export default function MealsScreen() {
  const colorScheme = useColorScheme();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={
            colorScheme === 'dark'
              ? require('@/assets/images/food3.jpg')
              : require('@/assets/images/food2.jpg')
          }
          style={styles.reactLogo}
        />
      }
    >
      <MealsContent />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
  },
});
