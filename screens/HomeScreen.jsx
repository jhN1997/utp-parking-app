import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider, Modal, Portal, Provider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getParkingHistoryByUser } from 'services/parkingRecordService';
import { getVehicleById } from 'services/vehicleService';
import useModulesByRol from '../utils/useModulesByRol';

export default function HomeScreen({ navigation }) {
  const [showQR, setShowQR] = useState(false);
  const [vehicleIn, setVehicleIn] = useState();

  const { auth } = useAuth();
  const modules = useModulesByRol(auth?.role);

  const handleClose = () => setShowQR(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const parkingData = await getParkingHistoryByUser(auth?.uid);
        const vehicleData = await getVehicleById(parkingData.vehicleId);

        const fecha = parkingData.entryTime.toDate();

        // Fecha: 4 de julio de 2025
        const fechaFormateada = new Intl.DateTimeFormat('es-PE', {
          timeZone: 'America/Lima',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(fecha);

        // Hora: 9:23 p. m.
        const horaFormateada = new Intl.DateTimeFormat('es-PE', {
          timeZone: 'America/Lima',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(fecha);

        const datosFinales = {
          ...parkingData,
          vehicle: vehicleData,
          date: fechaFormateada, // Extrae solo la fecha
          time: horaFormateada, // Extrae solo la hora
        };

        console.log('Paso 3 - Datos Finales:', datosFinales);
        setVehicleIn(datosFinales);
      } catch (error) {
        console.error('Error en la carga secuencial:', error);
      }
    };

    cargarDatos();
  }, []);

  const handleVehiclePress = () => {
    setShowQR(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: '#fff', justifyContent: 'flex-start' }}>
          <Appbar.Action
            icon="menu"
            color="#0b1c48" // 👈 aquí le das el color al ícono
            onPress={() => navigation.openDrawer()}
          />
          <View>
            <Image source={require('../assets/logo-parking.png')} style={styles.logo} />
          </View>
        </Appbar.Header>

        <View style={styles.container2}>
          <Text style={styles.header}>
            Hola, {auth?.name} {auth?.lastNames}
          </Text>
          <>
            {vehicleIn && auth?.role === 'student' && (
              <TouchableOpacity style={styles.vehicleIn} onPress={() => handleVehiclePress()}>
                <Text style={styles.titleCard}>Vehiculo estacionado:</Text>
                <View style={styles.cardContent}>
                  <Image
                    source={{ uri: vehicleIn.vehicle.photo_url }}
                    style={styles.imageVehicle}
                  />
                  <View style={styles.cardTextVehicle}>
                    <Text style={styles.titleVehicle}>
                      {vehicleIn.vehicle.brand} - {vehicleIn.vehicle.model}
                    </Text>
                    <Text style={styles.fecha}>Fecha de estacionamiento: {vehicleIn.date}</Text>
                    <Text style={styles.fecha}>Hora: {vehicleIn.time}</Text>
                    {vehicleIn.vehicle.plate && (
                      <Text style={styles.subtitle}>Placa: {vehicleIn.vehicle.plate}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </>
          <Divider style={{ marginVertical: 16 }} />

          <View style={styles.cardContainer}>
            {modules.map((mod, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(mod.route)}
              >
                <Icon name={mod.icon} size={36} color="#0b1c48" style={styles.icon} />
                <View style={styles.cardText}>
                  <Text style={styles.title}>{mod.title}</Text>
                  <Text style={styles.description}>{mod.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Portal>
        <Modal visible={showQR} onDismiss={handleClose} contentContainerStyle={styles.modal}>
          {vehicleIn && (
            <>
              <Text style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}>
                Vehículo: {vehicleIn.vehicle.brand} - {vehicleIn.vehicle.model}
              </Text>
              <QRCode value={vehicleIn.id} size={200} />
            </>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    height: 30,
    resizeMode: 'none',
    alignSelf: 'flex-start',
  },
  container2: { flex: 1, padding: 16, backgroundColor: '#f4f6f9' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#0b1c48',
  },
  cardContainer: {
    flex: 1,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0b1c48',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },

  vehicleIn: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
    width: '100%',
  },

  cardContent: {
    flexDirection: 'row', // 📌 imagen izquierda, texto derecha
    alignItems: 'center',
  },

  imageVehicle: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: 'cover',
    marginRight: 16,
  },

  cardTextVehicle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  titleVehicle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A0A0A',
  },

  // (opcional)
  subtitleVehicle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b1c48',
    marginBottom: 12,
  },

  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
});
