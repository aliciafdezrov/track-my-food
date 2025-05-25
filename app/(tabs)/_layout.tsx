
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NavigationLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(meals)"
          options={{
            title: 'Meals',
          }}
        />
        <Drawer.Screen
          name="(summary)"
          options={{
            title: 'Summary',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
