import { MaterialIcons } from '@expo/vector-icons';
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
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="ramen-dining" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="summary/index"
          options={{
            title: 'Resumen',
            drawerLabel: 'Resumen',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="bar-chart" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ingredients/index"
          options={{
            title: 'Ingredientes',
            drawerLabel: 'Ingredientes',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
