import { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';

export function useScreenFocus(callback: () => void) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callback();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
}
