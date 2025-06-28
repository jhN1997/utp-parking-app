import { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function RegisterVehicleScreen({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const handleSubmit = () => {
    const vehicleData = {
      placa,
      tipo,
      marca,
      modelo,
      color,
      numero_serie: numeroSerie,
      foto: fotoUrl,
    };

    Alert.alert('Registro exitoso', 'Tu vehículo ha sido registrado correctamente.');
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
        <Text style={styles.title}>Registrar vehículo</Text>

        <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={setPlaca} />

        <TextInput
          style={styles.input}
          placeholder="Tipo (ej: moto, scooter)"
          value={tipo}
          onChangeText={setTipo}
        />

        <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />

        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
        />

        <TextInput style={styles.input} placeholder="Color" value={color} onChangeText={setColor} />

        <TextInput
          style={styles.input}
          placeholder="Número de serie"
          value={numeroSerie}
          onChangeText={setNumeroSerie}
        />

        <TextInput
          style={styles.input}
          placeholder="URL de la foto del vehículo"
          value={fotoUrl}
          onChangeText={setFotoUrl}
        />

        <View style={styles.button}>
          <Button title="Registrar vehículo" onPress={handleSubmit} />
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#0b1c48',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
