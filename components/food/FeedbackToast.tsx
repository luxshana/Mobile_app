import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FeedbackToastProps {
  visible: boolean;
  message?: string;
}

export const FeedbackToast = ({ visible, message = "Item added to cart!" }: FeedbackToastProps) => {
  if (!visible) return null;

  return (
    <View style={styles.feedbackToast}>
      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      <Text style={styles.feedbackText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackToast: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
});
