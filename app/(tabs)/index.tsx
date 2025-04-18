import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecommendedOnly, setIsRecommendedOnly] = useState(false);

  const foodCategories = [
    {
      id: "1",
      title: "Drinks",
      image:
        "https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=300",
      count: 45,
    },
    {
      id: "2",
      title: "Snacks",
      image:
        "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300",
      count: 32,
    },
    {
      id: "3",
      title: "Seafood",
      image:
        "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=300",
      count: 28,
    },
    {
      id: "4",
      title: "Desserts",
      image:
        "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=300",
      count: 36,
    },
  ];

  const recentOrders = [
    {
      title: "Recent Orders",
      data: [
        {
          id: "1",
          name: "Grilled Salmon",
          price: "$24.90",
          image:
            "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=300",
          date: "2 days ago",
        },
        {
          id: "2",
          name: "Caesar Salad",
          price: "$18.50",
          image:
            "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=300",
          date: "3 days ago",
        },
      ],
    },
  ];

  const featuredDishes = [
    {
      id: "1",
      name: "Beef Wellington",
      distance: "1.2 km",
      rating: 4.8,
      price: "$32.90",
      image:
        "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=300",
      recommend: true,
    },
    {
      id: "2",
      name: "Truffle Pasta",
      distance: "0.8 km",
      rating: 4.9,
      price: "$28.50",
      image:
        "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=300",
      recommend: false,
    },
    {
      id: "3",
      name: "Tuna Tartare",
      distance: "1.5 km",
      rating: 4.7,
      price: "$26.90",
      image:
        "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=300",
      recommend: false,
    },
  ];

  const recommend = isRecommendedOnly
    ? featuredDishes.filter((item) => item.recommend)
    : featuredDishes;

  const renderFeaturedDish = ({ item }) => (
    <TouchableOpacity style={styles.dishCard} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{item.name}</Text>
        <View style={styles.dishDetails}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.category} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryCount}>{item.count} items</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentOrder = ({ item }) => (
    <TouchableOpacity style={styles.recentOrderCard} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.recentOrderImage} />
      <View style={styles.recentOrderInfo}>
        <Text style={styles.recentOrderName}>{item.name}</Text>
        <Text style={styles.recentOrderPrice}>{item.price}</Text>
        <Text style={styles.recentOrderDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>123 Main Street, New York</Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for restaurants, dishes..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.promoCard}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.promoContent}>
            <View>
              <Text style={styles.promoTitle}>Special Offer!</Text>
              <Text style={styles.promoDescription}>
                Get 20% off on your first order
              </Text>
            </View>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300",
              }}
              style={styles.promoImage}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={foodCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderCategory}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Dishes</Text>
            <View style={styles.recommendedToggle}>
              <Text style={styles.recommendedText}>Show recommended only</Text>
              <Switch
                value={isRecommendedOnly}
                onValueChange={setIsRecommendedOnly}
                trackColor={{ false: "#e0e0e0", true: "#4CAF50" }}
                thumbColor={isRecommendedOnly ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>
          <FlatList
            data={recommend}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderFeaturedDish}
            contentContainerStyle={styles.dishesList}
          />
        </View>

        <View style={styles.section}>
          <SectionList
            sections={recentOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderRecentOrder}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionTitle}>{title}</Text>
            )}
            stickySectionHeadersEnabled={false}
          />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            ></TouchableOpacity>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300",
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Special Offer!</Text>
            <Text style={styles.modalDescription}>
              Get 20% off on your first order when you order through our app!
              Use code WELCOME20 at checkout.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Claim Offer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  recommendedToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedText: {
    marginRight: 8,
    fontSize: 14,
    color: "#666",
  },
  promoCard: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: "#4CAF50",
    overflow: "hidden",
  },
  promoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoriesList: {
    paddingVertical: 8,
  },
  category: {
    marginRight: 16,
    width: 100,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryInfo: {
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: "#666",
  },
  dishCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  dishImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dishInfo: {
    padding: 16,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  dishDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#1a1a1a",
  },
  distance: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  recentOrderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  recentOrderImage: {
    width: 100,
    height: 100,
  },
  recentOrderInfo: {
    flex: 1,
    padding: 16,
  },
  recentOrderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  recentOrderPrice: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 4,
  },
  recentOrderDate: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
