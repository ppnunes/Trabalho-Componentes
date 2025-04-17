import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
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
} from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const foodCategories = [
    { id: '1', title: 'Drinks', image:require('../../assets/images/drinks.png'), data:[1,2] } ,
    { id: '2', title: 'Lanches', image:require('../../assets/images/snacks.png'), data:[1,2]},
    { id: '3', title: 'Frutos do Mar', image: require('../../assets/images/seafood.png'), data:[1,2] },
    { id: '4', title: 'Doces', image:require('../../assets/images/sweeties.png'), data:[1,2] },
  ];

  const lastOrders = [
    { data:[
      {title: 'Baião de Dois', price: 'R$ 54,90', image:require('../../assets/images/baiaodedois.jpeg')}
    ] },
    { data:[
      {title: 'Pamonha Temperada', price: 'R$ 18,00', image:require('../../assets/images/pamonha.jpeg')}
    ] }
  ];

  const featuredDishes = [
    { id: '1', name: 'Medalhão', distance: '1.0 km', rating: 4.8, image: require('../../assets/images/medalhao.png') },
    { id: '2', name: 'Salada César', distance: '500 m', rating: 4.8, image: require('../../assets/images/salada.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.location}>📍 Jl. Soekarno Hatta 15A...</Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Buscar menu, restaurante, etc"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={styles.banner} onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/images/banner.png')} style={styles.bannerImage} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Categorias de Alimentos</Text>
        <FlatList
          data={foodCategories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.category}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionTitle}>Melhores Pratos para Você</Text>
        <FlatList
          data={featuredDishes}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.dishCard}>
              <Image source={item.image} style={styles.dishImage} />
              <Text>{item.name}</Text>
              <Text>{item.distance} • ⭐ {item.rating}</Text>
            </View>
          )}
        />

        <View style={styles.switchContainer}>
          <Text>Mostrar apenas recomendados</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </View>

          <Text style={styles.sectionTitle}>Pedidos Recentemente</Text>
          <View style={styles.switchContainer}>
          <SectionList 
          sections={lastOrders}
          renderItem={({item}) => (
            <View style={styles.dishCard}>
              <Image source={item.image} style={styles.dishImage} />
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
              <br />
            </View>
          )}
          ></SectionList>
          </View>

        <Button
          title="Mostrar Alerta"
          onPress={() => Alert.alert("Aviso", "Você clicou no botão!")}
        />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Este é um Modal!</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  banner: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  bannerText: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  category: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  dishCard: {
    width: 150,
    marginRight: 15,
  },
  dishImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
  },
});

