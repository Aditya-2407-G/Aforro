import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCart } from '../../context/CartContext';

export default function ProductScreen() {
  const { product: productString } = useLocalSearchParams();
  const product = JSON.parse(productString as string);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // @ts-ignore
    addToCart(product);
    Alert.alert(
      "Added to Cart",
      `${product.title} has been added to your cart.`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain', marginBottom: 20 },
  
  // Product Title
  title: {
    fontSize: 26, // Larger, bolder title
    fontWeight: '700', 
    color: '#2d2d2d', 
    marginBottom: 10,
    letterSpacing: 0.5, // Subtle letter spacing for elegance
  },

  // Product Price
  price: {
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ff4c4c', // Eye-catching color for price
    marginBottom: 15,
    letterSpacing: 0.3, // Slight spacing for better legibility
  },

  // Product Description
  description: {
    fontSize: 16, 
    lineHeight: 24, // Better readability with increased line height
    marginBottom: 20, 
    color: '#4f4f4f', // Muted color to focus attention on the title/price
    textAlign: 'justify', // Align text for cleaner presentation
    letterSpacing: 0.2, // Adds elegance to the description text
  },

  // Button Styling
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 14, 
    paddingHorizontal: 25, 
    borderRadius: 10, // Rounded button for modern style
    alignItems: 'center',
    shadowColor: '#000', // Adding shadow for button depth
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
    marginBottom: 40,
  },

  // Button Text
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5, // Adds subtle elegance to button text
  },
});
