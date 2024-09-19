import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { debounce } from 'lodash'; // Make sure to install lodash if not already installed

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Product = {
  price: number;
  image: string | undefined;
  id: number;
  title: string;
  url: string;
};

type Banner = {
  id: number;
  image: string;
};

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { addToCart, cartItems } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const banners: Banner[] = [
      {
          id: 1,
          image: "https://via.placeholder.com/300x150?text=Fresh+Fruits",
      },
      {
          id: 2,
          image: "https://via.placeholder.com/300x150?text=Vegetable+Offers",
      },
      {
          id: 3,
          image: "https://via.placeholder.com/300x150?text=Dairy+Deals",
      },
      {
          id: 4,
          image: "https://via.placeholder.com/300x150?text=Organic+Produce",
      },
  ];

  const bannerListRef = useRef<FlatList>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
      const loadData = async () => {
          try {
              await Promise.all([fetchCategories(), fetchProducts(), getCurrentLocation()]);
          } catch (error) {
              console.error("Error loading data:", error);
          } finally {
              setIsLoading(false);
          }
      };

      loadData();
  }, []);

  const fetchCategories = async () => {
      try {
          const response = await fetch("https://fakestoreapi.com/products/categories");
          const data = await response.json();
          const categoriesWithIcons: Category[] = data.map((category: string, index: number) => ({
              id: index.toString(),
              name: category, // use original category name
              icon: getCategoryIcon(category),
          }));
          setCategories(categoriesWithIcons);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
  };

  const getCategoryIcon = (category: string) => {
      switch (category) {
          case "electronics":
              return "💻";
          case "jewelery":
              return "💍";
          case "men's clothing":
              return "👔";
          case "women's clothing":
              return "👗";
          default:
              return "🛒";
      }
  };

  const fetchProducts = async () => {
      try {
          const response = await fetch("https://fakestoreapi.com/products?limit=10");
          const data = await response.json();
          setProducts(data);
      } catch (error) {
          console.error("Error fetching products:", error);
      }
  };

  const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
      }

      try {
          let location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
          });
          const { latitude, longitude } = location.coords;

          let [address] = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
          });

          if (address) {
              const locationString = `${address.city || ""}, ${address.region || ""}, ${address.country || ""}`;
              setUserLocation(locationString.replace(/^, /, "").replace(/, $/, ""));
          } else {
              setUserLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          }
      } catch (error) {
          console.error("Error getting current location:", error);
          setUserLocation("Location unavailable");
      }
  };

  const handleCategoryPress = (category: string) => {
      router.push(`/(screens)/CategoryScreen/${encodeURIComponent(category)}`);
  };

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      Promise.all([fetchProducts(), fetchCategories(), getCurrentLocation()]).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
          bannerListRef.current?.scrollToIndex({
              index: currentBannerIndex,
              animated: true,
          });
      }, 3000);

      return () => clearInterval(intervalId);
  }, [currentBannerIndex]);

  const handleSearch = useCallback(
    debounce((text: string) => {
      const lowercasedQuery = text.toLowerCase();
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }, 300),
    [products]
  );

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const getItemLayout = (data: any, index: number) => ({
    length: 360, // This should match the width of your banner images
    offset: 360 * index,
    index,
  });

  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      bannerListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  if (isLoading) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading Fresh Goods...</Text>
          </View>
      );
  }

  return (
      <SafeAreaView style={styles.container}>
          <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.header}>
              <TouchableOpacity onPress={getCurrentLocation} style={styles.locationButton}>
                  <Ionicons name="location-outline" size={24} color={colors.white} />
                  <Text style={styles.location} numberOfLines={1}>
                      {userLocation || "Getting location..."}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/cart")} style={styles.cartButton}>
                  <Ionicons name="cart-outline" size={24} color={colors.white} />
                  {cartItems && cartItems.length > 0 && (
                      <View style={styles.cartBadge}>
                          <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                      </View>
                  )}
              </TouchableOpacity>
          </LinearGradient>

          <FlatList
              data={filteredProducts}
              ListHeaderComponent={
                  <>
                      <View style={styles.searchBarContainer}>
                          <View style={styles.searchBar}>
                              <Ionicons name="search" size={24} color={colors.darkGray} />
                              <TextInput
                                  style={styles.searchInput}
                                  placeholder="Search for products..."
                                  placeholderTextColor={colors.darkGray}
                                  value={searchQuery}
                                  onChangeText={(text) => {
                                    setSearchQuery(text);
                                    handleSearch(text);
                                  }}
                              />
                              {searchQuery.length > 0 && (
                                <TouchableOpacity
                                  onPress={() => {
                                    setSearchQuery('');
                                    setFilteredProducts(products);
                                  }}
                                >
                                  <Ionicons name="close-circle" size={24} color={colors.darkGray} />
                                </TouchableOpacity>
                              )}
                          </View>
                      </View>

                      <FlatList
                          ref={bannerListRef}
                          data={banners}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                              <Image source={{ uri: item.image }} style={styles.bannerImage} />
                          )}
                          style={styles.bannerList}
                          pagingEnabled
                          getItemLayout={getItemLayout}
                          onScrollToIndexFailed={handleScrollToIndexFailed}
                      />

                      <Text style={styles.sectionTitle}>Shop by Category</Text>
                      <FlatList
                          data={categories}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                              <TouchableOpacity
                                  style={styles.categoryItem}
                                  onPress={() => handleCategoryPress(item.name)}
                              >
                                  <View style={styles.categoryIcon}>
                                      <Text style={styles.categoryIconText}>{item.icon}</Text>
                                  </View>
                                  <Text style={styles.categoryName}>{item.name}</Text>
                              </TouchableOpacity>
                          )}
                          style={styles.categoryList}
                      />

                      <Text style={styles.sectionTitle}>{searchQuery ? 'Search Results' : 'Featured Products'}</Text>
                  </>
              }
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <Link
                      href={{
                          pathname: "/(screens)/ProductScreen",
                          params: { product: JSON.stringify(item) },
                      }}
                      asChild
                  >
                      <TouchableOpacity style={styles.productItem}>
                          <Image source={{ uri: item.image }} style={styles.productImage} />
                          <View style={styles.productInfo}>
                              <Text style={styles.productTitle} numberOfLines={2}>
                                  {item.title}
                              </Text>
                              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                          </View>
                      </TouchableOpacity>
                  </Link>
              )}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              contentContainerStyle={styles.productList}
          />
      </SafeAreaView>
  );
};

const colors = {
  primary: "#4caf50",
  primaryLight: "#81c784",
  white: "#ffffff",
  darkGray: "#a9a9a9",
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.white,
  },
  header: {
      height: 50,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
  },
  locationButton: {
      flexDirection: "row",
      alignItems: "center",
  },
  location: {
      color: colors.white,
      marginLeft: 8,
      maxWidth: 150,
  },
  cartButton: {
      position: "relative",
  },
  cartBadge: {
      position: "absolute",
      top: -5,
      right: -10,
      backgroundColor: "red",
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
  },
  cartBadgeText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: "bold",
  },
  loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  loadingText: {
      marginTop: 16,
      color: colors.primary,
  },
  searchBarContainer: {
      paddingHorizontal: 16,
      marginTop: 16,
  },
  searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      padding: 8,
      borderRadius: 8,
  },
  searchInput: {
      marginLeft: 8,
      flex: 1,
      color: colors.darkGray,
      height: 40, // Add this to improve touch target size
  },
  bannerList: {
      marginVertical: 12,
  },
  bannerImage: {
      width: 360, // Make sure this matches the width in getItemLayout
      height: 150,
      borderRadius: 8,
      marginHorizontal: 8,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 16,
      marginVertical: 8,
  },
  categoryList: {
      paddingHorizontal: 16,
  },
  categoryItem: {
      alignItems: "center",
      marginRight: 16,
  },
  categoryIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
  },
  categoryIconText: {
      fontSize: 24,
  },
  categoryName: {
      marginTop: 8,
      fontSize: 14,
      textAlign: "center",
  },
  productList: {
      paddingHorizontal: 16,
  },
  productItem: {
      flex: 1,
      margin: 8,
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
  },
  productImage: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 8,
  },
  productInfo: {
      alignItems: "center",
  },
  productTitle: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
  },
  productPrice: {
      fontSize: 16,
      color: colors.primary,
      marginTop: 8,
  },
});

export default HomeScreen;
