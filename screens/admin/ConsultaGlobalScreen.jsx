import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function ConsultaGlobalScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 'veh_001',
        placa: 'ABC123',
        tipo: 'moto',
        marca: 'Honda',
        modelo: 'CBR500',
        color: 'Negro',
        estado: 'validado',
        foto: 'https://images.ctfassets.net/8zlbnewncp6f/7unFmIVxsPZ8sid2pSYAcv/033ac0451381cb4024c9b20fe0edc983/Honda_190_color_negro_galgo_peru_compressed.png?w=600&fm=webp&q=90',
      },
      {
        id: 'veh_002',
        placa: 'XYZ789',
        tipo: 'scooter',
        marca: 'Yamaha',
        modelo: 'Neo',
        color: 'Negro',
        estado: 'pendiente',
        foto: 'https://promart.vteximg.com.br/arquivos/ids/5924335/imageUrl_1.jpg?v=637904985541570000',
      },
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
        <Text
          style={[
            styles.estado,
            item.estado === 'validado' ? styles.estado : styles.estadoPendiente,
          ]}
        >
          Estado: {item.estado}
        </Text>
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
        <Text style={styles.title}>Consulta Global de Vehículos</Text>
        <FlatList
          data={vehicles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
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
  estado: {
    marginTop: 6,
    fontWeight: '600',
  },
  estadoOk: {
    color: 'green',
  },
  estadoPendiente: {
    color: 'orange',
  },
});
