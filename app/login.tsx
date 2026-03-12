import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';
import { globalStyles } from '../styles/globalStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

  
    if (email.toLowerCase() === 'test@example.com' && password === 'password123') {
      dispatch(login({ email: email.toLowerCase(), name: 'Test User' }));
      router.replace('/(tabs)');
    } else {
      Alert.alert(
        'Invalid Credentials', 
        'For demo purposes, please use:\nEmail: test@example.com\nPassword: password123'
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[globalStyles.container, globalStyles.contentPadding, styles.formContainer]}>
          <View style={styles.headerContainer}>
            <Ionicons name="fast-food-sharp" size={60} color="rgba(23, 17, 9, 0.88)" />
            <Text style={globalStyles.headerTitle}>Foodies</Text>
            <Text style={globalStyles.subTitle}>Sign in to your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email (test@example.com)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password (password123)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={[globalStyles.primaryButton, { marginTop: 8 }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={globalStyles.primaryButtonText}>Login</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  demoCreds: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
