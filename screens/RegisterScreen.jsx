import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { registerUser } from 'services/userService';

export default function RegisterScreen() {
  const [utpCode, setUtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [dni, setDni] = useState('');

  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // Puedes cambiarlo con un dropdown si deseas
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!utpCode || !password || !name || !lastNames || !dni) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      setLoading(true);
      await registerUser(utpCode, password, { name, lastNames, dni, role, utpCode });
      Alert.alert(
        '✅ Éxito',
        'Usuario registrado correctamente, confirma tu correo electrónico para iniciar sesión.',
      );

      navigation.navigate('Login'); // Redirigir al login
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo-parking.png')} style={styles.logo} />
        <Text style={styles.title}>Registro de Usuario</Text>

        <TextInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Apellidos"
          value={lastNames}
          onChangeText={setLastNames}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="DNI"
          value={dni}
          mode="outlined"
          maxLength={8}
          autoCapitalize="none"
          onChangeText={(text) => {
            const cleanText = text
              .toUpperCase() // convierte a mayúsculas
              .replace(/[^0-9]/g, ''); // elimina todo lo que no sea letra o número
            setDni(cleanText);
          }}
          style={styles.input}
        />

        <TextInput
          label="Código UTP"
          value={utpCode}
          mode="outlined"
          placeholder="Ejemplo: U21213982"
          autoCapitalize="none"
          onChangeText={(text) => {
            const cleanText = text
              .toUpperCase() // convierte a mayúsculas
              .replace(/[^A-Z0-9]/g, ''); // elimina todo lo que no sea letra o número
            setUtpCode(cleanText);
          }}
          style={styles.input}
        />

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Registrarse
        </Button>

        <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 12 }}>
          Ya tengo una cuenta
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#0b1c48',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0b1c48',
    paddingVertical: 8,
  },
});
