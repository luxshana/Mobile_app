import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles, Spacing } from '../../styles/globalStyles';

export interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface FoodCardProps {
  item: FoodItemProps;
  quantity: number;
  onAdd: (item: FoodItemProps) => void;
  onRemove: (itemId: string) => void;
}

export const FoodCard = ({ item, quantity, onAdd, onRemove }: FoodCardProps) => {
  return (
    <View style={[globalStyles.cardRow, { overflow: 'hidden', marginBottom: Spacing.lg }]}>
      <View style={{ width: 100, height: 100, backgroundColor: '#f0f0f0' }}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={globalStyles.cardImageFull}
            resizeMode="cover"
          />
        ) : (
          <View style={globalStyles.placeholderImage}>
            <Ionicons name="restaurant-outline" size={40} color="#999" />
          </View>
        )}
      </View>

      <View style={{ flex: 1, padding: Spacing.md }}>
        <Text style={[globalStyles.sectionTitle, { fontSize: 16, marginBottom: 4 }]}>
          {item.name || 'Unnamed Item'}
        </Text>
        <Text style={globalStyles.priceText}>
          ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
        </Text>
        {item.description && (
          <Text style={[globalStyles.subTitle, { fontSize: 13, lineHeight: 18, marginBottom: Spacing.sm }]} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        <View style={{ marginTop: 4 }}>
          {quantity === 0 ? (
            <TouchableOpacity 
              style={[globalStyles.secondaryButton, { alignSelf: 'flex-start', paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md }]}
              onPress={() => onAdd(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text style={[globalStyles.secondaryButtonText, { fontSize: 14, marginLeft: 6 }]}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={[globalStyles.quantityRow, { backgroundColor: '#f0f0f0', borderRadius: 8, alignSelf: 'flex-start' }]}>
              <TouchableOpacity 
                style={globalStyles.quantityButtonLarge}
                onPress={() => onRemove(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color="#fff" />
              </TouchableOpacity>
              
              <Text style={globalStyles.quantityTextLarge}>{quantity}</Text>
              
              <TouchableOpacity 
                style={globalStyles.quantityButtonLarge}
                onPress={() => onAdd(item)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
