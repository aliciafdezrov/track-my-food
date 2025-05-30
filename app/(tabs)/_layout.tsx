import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NavigationLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="meals/index"
          options={{
            title: 'Comidas',
            drawerLabel: 'Comidas',
          }}
        />
        <Drawer.Screen
          name="summary/index"
          options={{
            title: 'Resumen',
            drawerLabel: 'Resumen',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
