import { useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';

export default function BusquedaVehiculoScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [vehiculo, setVehiculo] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const baseDeDatosSimulada = [
    {
      id: 'veh_001',
      placa: 'ABC123',
      tipo: 'moto',
      marca: 'Honda',
      modelo: 'CBR500',
      color: 'Rojo',
      numero_serie: 'JH2PC4009EM000001',
      foto: 'https://tuapp.com/uploads/veh_98723.jpg',
      estado: 'validado',
    },
    {
      id: 'veh_002',
      placa: 'XYZ789',
      tipo: 'scooter',
      marca: 'Yamaha',
      modelo: 'Neo',
      color: 'Azul',
      numero_serie: 'SERIE-YAM-789',
      foto: 'https://via.placeholder.com/100',
      estado: 'pendiente',
    },
  ];

  const handleBuscar = () => {
    Keyboard.dismiss();
    const resultado = baseDeDatosSimulada.find(
      (v) =>
        v.placa.toLowerCase() === search.toLowerCase() ||
        v.numero_serie.toLowerCase() === search.toLowerCase(),
    );

    if (resultado) {
      setVehiculo(resultado);
      setNotFound(false);
    } else {
      setVehiculo(null);
      setNotFound(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerHeader}>
        <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
          <Appbar.Action icon="menu" color="#0b1c48" onPress={() => navigation.openDrawer()} />
          <View>
            <Image source={require('../../assets/logo-parking.png')} style={styles.logo} />
          </View>
        </Appbar.Header>

        <View style={styles.container}>
          <Text style={styles.title}>Buscar Vehículo</Text>
          <TextInput
            placeholder="Placa o número de serie"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleBuscar} style={styles.button}>
            Buscar
          </Button>

          {vehiculo && (
            <Card style={styles.card}>
              <Card.Title
                title={vehiculo.placa}
                subtitle={`${vehiculo.marca} ${vehiculo.modelo}`}
              />
              <Card.Cover source={{ uri: vehiculo.foto }} style={styles.image} />
              <Card.Content>
                <Text>Tipo: {vehiculo.tipo}</Text>
                <Text>Color: {vehiculo.color}</Text>
                <Text>Serie: {vehiculo.numero_serie}</Text>
                <Text>Estado: {vehiculo.estado}</Text>
              </Card.Content>
            </Card>
          )}

          {notFound && <Text style={styles.notFound}>Vehículo no encontrado.</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#0b1c48',
  },
  card: {
    marginTop: 10,
  },
  image: {
    height: 180,
    marginTop: 8,
  },
  notFound: {
    marginTop: 20,
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
