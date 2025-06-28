import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function MyVehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const data = [
      {
        id: 'veh_001',
        placa: 'ABC123',
        tipo: 'moto',
        marca: 'Honda',
        modelo: 'CBR500',
        color: 'Rojo',
        numero_serie: 'JH2PC4009EM000001',
        foto: 'https://zoomempresarial.pe/wp-content/uploads/2024/09/Yamaha-MT-09.jpg',
      },
      // Puedes agregar más vehículos aquí
    ];
    setVehicles(data);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.placa}>{item.placa}</Text>
        <Text style={styles.text}>
          {item.tipo.toUpperCase()} - {item.marca} {item.modelo}
        </Text>
        <Text style={styles.text}>Color: {item.color}</Text>
        <Text style={styles.text}>Serie: {item.numero_serie}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerHeader}>
      <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
        <Appbar.Action
          icon="menu"
          color="#0b1c48" // 👈 aquí le das el color al ícono
          onPress={() => navigation.openDrawer()}
        />
        <View>
          <Image source={require('../../assets/logo-parking.png')} style={styles.logo} />
        </View>
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.title}>Mis Vehículos Registrados</Text>
        {vehicles.length === 0 ? (
          <Text style={styles.empty}>No tienes vehículos registrados.</Text>
        ) : (
          <FlatList
            data={vehicles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: { flex: 1, backgroundColor: '#fff' },
  logo: {
    height: 30,
    resizeMode: 'none',
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1c48',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e3e3e3',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  placa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a2e60',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#999',
  },
});
