import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function ValidacionScreen({ navigation }) {
  const [vehiculosPendientes, setVehiculosPendientes] = useState([]);

  useEffect(() => {
    // Simulación de consulta de vehículos pendientes
    const data = [
      {
        id: 'veh_003',
        placa: 'DEF456',
        tipo: 'cuatrimoto',
        marca: 'Kawasaki',
        modelo: 'Brute Force',
        color: 'Verde',
        numero_serie: 'SERIE4567DEF',
        foto: 'https://via.placeholder.com/100',
      },
      {
        id: 'veh_004',
        placa: 'GHI789',
        tipo: 'moto',
        marca: 'Suzuki',
        modelo: 'GSX-R600',
        color: 'Negro',
        numero_serie: 'SERIE7890GHI',
        foto: 'https://via.placeholder.com/100',
      },
    ];
    setVehiculosPendientes(data);
  }, []);

  const handleValidar = (id) => {
    Alert.alert('Validar Vehículo', '¿Estás seguro de validar este vehículo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Validar',
        onPress: () => {
          setVehiculosPendientes((prev) => prev.filter((v) => v.id !== id));
        },
      },
    ]);
  };

  const handleRechazar = (id) => {
    Alert.alert('Rechazar Vehículo', '¿Deseas rechazar este vehículo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Rechazar',
        onPress: () => {
          setVehiculosPendientes((prev) => prev.filter((v) => v.id !== id));
        },
      },
    ]);
  };

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
        <View style={styles.actions}>
          <Button
            title="Validar"
            mode="contained"
            onPress={() => handleValidar(item.id)}
            style={[styles.button, { backgroundColor: '#4caf50' }]}
          >
            Validar
          </Button>
          <Button
            mode="contained"
            onPress={() => handleRechazar(item.id)}
            style={[styles.button, { backgroundColor: '#f44336' }]}
          >
            Rechazar
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.containerHeader}>
      <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
        <Appbar.Action icon="menu" color="#0b1c48" onPress={() => navigation.openDrawer()} />
        <View>
          <Image source={require('../../assets/logo-parking.png')} style={styles.logo} />
        </View>
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.title}>Validación de Vehículos</Text>
        <FlatList
          data={vehiculosPendientes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.empty}>No hay vehículos pendientes.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ccc',
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
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
