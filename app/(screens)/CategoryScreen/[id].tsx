import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const CategoryProducts = () => {
  const { id } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{decodeURIComponent(id as string)} Products</Text>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link 
            href={{
              //@ts-ignore
              pathname: "/(screens)/ProductScreen",
              params: { product: JSON.stringify(item) }
            }} 
            asChild
          >
            <TouchableOpacity style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName} numberOfLines={2}>{item.title.slice(0, 20)}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={styles.productsList}
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
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.darkGray,
    marginBottom: 12,
    textAlign: 'center',
  },
  productItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    margin: 8,
    elevation: 2,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  productsList: {
    paddingHorizontal: 8,
  },
});

export default CategoryProducts;
