import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addToCart, clearCart, removeEntireItem, removeFromCart } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { globalStyles, Spacing } from '../../styles/globalStyles';

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const cartItems = useAppSelector(state => state.cart.items);
  const cartItemsArray = Object.values(cartItems);

  const totalAmount = cartItemsArray.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const updateQuantity = (item: any, action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const removeItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeEntireItem(itemId))
        }
      ]
    );
  };

  const clearCartAlert = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearCart())
        }
      ]
    );
  };

  const proceedToCheckout = () => {
    Alert.alert(
      'Proceed to Checkout',
      'Successful checkout',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed',
          onPress: () => {
            dispatch(clearCart());
            Alert.alert("Success", "Your order has been placed!");
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={globalStyles.cardRow}>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={globalStyles.cardImageFull}
            resizeMode="cover"
          />
        ) : (
          <View style={globalStyles.placeholderImage}>
            <Ionicons name="restaurant-outline" size={30} color="#999" />
          </View>
        )}
      </View>

      <View style={{ flex: 1, marginLeft: Spacing.md }}>
        <Text style={[globalStyles.sectionTitle, { fontSize: 16, marginBottom: 4 }]}>{item.name}</Text>
        <Text style={globalStyles.priceText}>${item.price.toFixed(2)}</Text>
        
        <View style={globalStyles.quantityRow}>
          <TouchableOpacity 
            style={globalStyles.quantityButton}
            onPress={() => updateQuantity(item, 'decrease')}
          >
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>
          
          <Text style={globalStyles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={globalStyles.quantityButton}
            onPress={() => updateQuantity(item, 'increase')}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Text style={[globalStyles.sectionTitle, { fontSize: 16, marginBottom: Spacing.sm }]}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity 
          style={globalStyles.iconButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={globalStyles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={globalStyles.emptyTitle}>Your cart is empty</Text>
      <Text style={globalStyles.emptyText}>
        Looks like you haven't added any items to your cart yet
      </Text>
      <TouchableOpacity 
        style={[globalStyles.secondaryButton, { marginTop: Spacing.lg }]}
        onPress={() => router.push('/')}
      >
        <Text style={globalStyles.secondaryButtonText}>Browse Food Items</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.safeAreaGray}>
      <View style={globalStyles.screenHeader}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={globalStyles.sectionTitle}>My Cart</Text>
        {cartItemsArray.length > 0 && (
          <TouchableOpacity style={globalStyles.iconButton} onPress={clearCartAlert}>
            <Text style={[globalStyles.dangerText, { fontSize: 14 }]}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={cartItemsArray}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: Spacing.lg, flexGrow: 1 }}
        ListEmptyComponent={renderEmptyCart}
        showsVerticalScrollIndicator={false}
      />

      {cartItemsArray.length > 0 && (
        <View style={globalStyles.listFooter}>
          <View style={globalStyles.totalRow}>
            <Text style={globalStyles.totalLabel}>Total Amount:</Text>
            <Text style={globalStyles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            style={globalStyles.primaryButton}
            onPress={proceedToCheckout}
          >
            <Text style={globalStyles.primaryButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: Spacing.sm }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
})

export default CartScreen