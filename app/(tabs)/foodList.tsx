import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { foodItems } from '../../data/foodData';

import { FeedbackToast } from '../../components/food/FeedbackToast';
import { FoodCard, FoodItemProps } from '../../components/food/FoodCard';

import { addToCart, removeFromCart } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { globalStyles } from '../../styles/globalStyles';

const FoodList = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<any[]>([]);
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddToCart = (item: FoodItemProps) => {
    dispatch(addToCart(item));
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 1500);
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const getItemQuantity = (itemId: string) => {
    return cartItems[itemId]?.quantity || 0;
  };

  useEffect(() => {
    loadFoodData();
  }, [id]);

  const loadFoodData = () => {
    try {
      setLoading(true);
      if (!id || typeof id !== 'string') throw new Error('No category ID provided');
      
      const categoryData = foodItems[id as keyof typeof foodItems];
      if (!categoryData) throw new Error('Category not found');
      if (!Array.isArray(categoryData)) throw new Error('Invalid data format');

      setFoodData(categoryData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading food data:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderFoodItem = ({ item }: { item: any }) => (
    <FoodCard 
      item={item} 
      quantity={getItemQuantity(item.id)} 
      onAdd={handleAddToCart} 
      onRemove={handleRemoveFromCart} 
    />
  );

  const renderEmptyComponent = () => (
    <View style={globalStyles.emptyContainer}>
      <Ionicons name="restaurant-outline" size={60} color="#ccc" />
      <Text style={globalStyles.emptyText}>No food items available in this category</Text>
    </View>
  );

  const renderErrorComponent = () => (
    <View style={globalStyles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={60} color="#e74c3c" />
      <Text style={globalStyles.errorText}>{error}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={globalStyles.container}>
        {renderErrorComponent()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyles.container}>

      <FeedbackToast visible={showCartFeedback} />

      <FlatList
        data={foodData}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 },
});

export default FoodList;