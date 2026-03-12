import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';
import { categories } from '../../data/foodData';
import { BorderRadius, globalStyles, Spacing, Typography } from '../../styles/globalStyles';

const { width } = Dimensions.get('window');
const numColumns = 2;
const cardMargin = Spacing.sm;
const containerPadding = Spacing.lg;
const availableWidth = width - (containerPadding * 2) - (cardMargin * numColumns * 2);
const cardWidth = availableWidth / numColumns;
const cardNameFontSize = Math.min(16, cardWidth * 0.12);
const cardTitleFontSize = Typography.titleLarge.fontSize;

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handlePress = (item: any) => {
    router.push({
      pathname: '/foodList',
      params: { id: item.id, name: item.name },
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        globalStyles.categoryCard,
        { width: cardWidth, height: cardWidth * 1.2 },
        index % numColumns === 0 ? { marginRight: cardMargin } : { marginLeft: cardMargin },
      ]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image }}
        style={globalStyles.cardImageFull}
        resizeMode="cover"
      />
      <View style={globalStyles.cardOverlay}>
        <Text
          style={[globalStyles.cardOverlayText, { fontSize: cardNameFontSize }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>
        We couldn't find any category matching "{searchQuery}"
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.safeAreaGray}>
      <View style={[globalStyles.containerGray, globalStyles.contentPadding]}>

   
        <View style={globalStyles.pageHeader}>
          <Text style={[globalStyles.headerTitle, { fontSize: cardTitleFontSize }]}>
            Food Categories
          </Text>
          <Text style={globalStyles.subTitle}>What would you like to eat today?</Text>
        </View>

        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        
        {searchQuery.trim().length > 0 && (
          <Text style={styles.resultsCount}>
            {filteredCategories.length}{' '}
            {filteredCategories.length === 1 ? 'category' : 'categories'} found
          </Text>
        )}

       
        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: Spacing.xl },
            filteredCategories.length === 0 && { flexGrow: 1 },
          ]}
          columnWrapperStyle={
            filteredCategories.length > 0
              ? { justifyContent: 'space-between', marginBottom: cardMargin * 2 }
              : undefined
          }
          ListEmptyComponent={renderEmptyState}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.light.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: Spacing.xs,
  },
  resultsCount: {
    fontSize: 13,
    color: '#999',
    marginBottom: Spacing.sm,
    marginLeft: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});