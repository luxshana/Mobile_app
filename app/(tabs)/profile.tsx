import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { globalStyles, Spacing } from '../../styles/globalStyles';

const menuItems = [
  { icon: 'person', label: 'My Profile', value: '' },
  { icon: 'history', label: 'Order History', value: '5 orders' },
  { icon: 'favorite', label: 'Favorites', value: '3 items' },
  { icon: 'location-on', label: 'Delivery Address', value: 'Home' },
  { icon: 'payment', label: 'Payment Methods', value: 'Visa **4242' },
  { icon: 'settings', label: 'Settings', value: '' },
  { icon: 'help', label: 'Help & Support', value: '' },
];

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.sectionTitle}>Profile</Text>
      </View>

      <View style={[globalStyles.row, { backgroundColor: '#fff', padding: Spacing.xl, marginTop: 1 }]}>
        <View style={globalStyles.avatar}>
          <Icon name="person" size={40} color="#fff" />
        </View>
        <View style={{ marginLeft: Spacing.lg }}>
          <Text style={[globalStyles.sectionTitle, { marginBottom: 4 }]}>Luxshana Sivapatham</Text>
          <Text style={globalStyles.subTitle}>Luxshanasiva98@gmail.com </Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', marginTop: Spacing.lg, paddingHorizontal: Spacing.lg }}>
        {menuItems.map((item, index: number) => (
          <TouchableOpacity key={index} style={globalStyles.menuRow}>
            <View style={globalStyles.menuRowLeft}>
              <Icon name={item.icon} size={24} color="#666" />
              <Text style={globalStyles.menuLabel}>{item.label}</Text>
            </View>
            <View style={globalStyles.menuRowRight}>
              {item.value ? (
                <Text style={globalStyles.menuValue}>{item.value}</Text>
              ) : null}
              <Icon name="chevron-right" size={24} color="#ccc" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#e74c3c" />
        <Text style={globalStyles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;