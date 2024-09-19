import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type Category = string;

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/(screens)/CategoryScreen/${encodeURIComponent(category)}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return 'laptop-outline';
      case 'jewelery':
        return 'diamond-outline';
      case "men's clothing":
        return 'shirt-outline';
      case "women's clothing":
        return 'woman-outline';
      default:
        return 'cube-outline';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </LinearGradient>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
            <Ionicons name={getCategoryIcon(item)} size={40} color={colors.primary} />
            <Text style={styles.categoryName}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const colors = {
  primary: '#4caf50', // Green
  primaryLight: '#81c784', // Light Green
  white: '#ffffff',
  darkGray: '#757575',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
  },
  listContainer: {
    padding: 16,
  },
  categoryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkGray,
  },
});

export default Categories;
    