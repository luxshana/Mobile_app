import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartFloatingIconProps {
  totalItems: number;
  onPress: () => void;
}

export const CartFloatingIcon = ({ totalItems, onPress }: CartFloatingIconProps) => {
  if (totalItems === 0) return null;

  return (
    <TouchableOpacity 
      style={styles.cartIcon}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="cart" size={28} color="#007AFF" />
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{totalItems}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 1000,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
