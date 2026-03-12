import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodItemProps } from '../components/food/FoodCard'; // Reusing our type

export interface CartItem extends FoodItemProps {
  quantity: number;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<FoodItemProps>) => {
      const item = action.payload;
      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        state.items[item.id] = { ...item, quantity: 1 };
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        if (state.items[itemId].quantity > 1) {
          state.items[itemId].quantity -= 1;
        } else {
          delete state.items[itemId];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
    removeEntireItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      delete state.items[itemId];
    }
  },
});

export const { addToCart, removeFromCart, clearCart, removeEntireItem } = cartSlice.actions;
export default cartSlice.reducer;
