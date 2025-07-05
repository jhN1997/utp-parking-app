import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Appbar, Modal, Portal, Provider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { getVehiclesByUserId } from 'services/vehicleService';

export default function MyVehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth, logout } = useAuth();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const handleVehiclePress = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowQR(true);
  };

  const handleClose = () => setShowQR(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await getVehiclesByUserId(auth?.uid);
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleVehiclePress(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.photo_url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.plate}>{item.status}</Text>
          <Text style={styles.text}>
            {item.type.toUpperCase()} - {item.brand} {item.model}
          </Text>
          <Text style={styles.text}>Color: {item.color}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#000" />;
  } else {
    return (
      <Provider>
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
        {/* Modal QR */}
        <Portal>
          <Modal visible={showQR} onDismiss={handleClose} contentContainerStyle={styles.modal}>
            {selectedVehicle && (
              <>
                <Text style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}>
                  Vehículo: {selectedVehicle.brand} - {selectedVehicle.model}
                </Text>
                <QRCode
                  value={JSON.stringify({
                    vehicleId: selectedVehicle.id,
                    userId: auth?.uid, // Simulando un ID de usuario,
                  })}
                  size={200}
                />
              </>
            )}
          </Modal>
        </Portal>
      </Provider>
    );
  }
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
});
