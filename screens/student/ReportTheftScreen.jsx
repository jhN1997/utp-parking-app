/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

export default function ReportTheftScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Simulación de vehículos disponibles (reemplaza con fetch real si lo deseas)
    const data = [
      { id: 'veh_001', placa: 'ABC123' },
      { id: 'veh_002', placa: 'XYZ789' },
    ];
    setVehicles(data);
    if (data.length > 0) setSelectedVehicle(data[0].id);
  }, []);

  const handleSubmit = () => {
    if (!selectedVehicle || !description || !location || !date) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const theftReport = {
      vehiculo_id: selectedVehicle,
      descripcion: description,
      ubicacion: location,
      fecha_reporte_robo: date,
    };

    Alert.alert('Reporte enviado', 'Tu reporte ha sido registrado correctamente.');
    // Aquí podrías enviar el POST al backend
  };

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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reportar robo de vehículo</Text>

        <Text style={styles.label}>Selecciona tu vehículo:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedVehicle}
            onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
            style={styles.picker}
          >
            {vehicles.map((v) => (
              <Picker.Item key={v.id} label={v.placa} value={v.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Fecha del robo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 2025-06-26"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Lugar del robo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ciudad, zona, dirección aproximada..."
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Descripción adicional:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlign: 'left', textAlignVertical: 'top' }]}
          placeholder="Agrega detalles del robo..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.buttonWrapper}>
          <Button title="Reportar robo" onPress={handleSubmit} color="#d32f2f" />
        </View>
      </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b71c1c',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'visible',
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
