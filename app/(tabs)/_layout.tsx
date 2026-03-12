import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";

import { useAppSelector } from '../../store/hooks';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-sharp" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cart-sharp" color={color} />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle-sharp" color={color}  />,
        }}
      />
      <Tabs.Screen
        name="foodList"
        options={{
          title: 'Food List',
          href: null, 
          headerShown: true
        }}
      />
    </Tabs>
  );
}
