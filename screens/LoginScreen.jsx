import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput, TouchableRipple } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    // Simulated login logic
    const userAthenticated = {
      uid: 'U12121398a2',
      nombre: 'John',
      rol: 'admin', // admin o 'estudiante'
    };
    login(userAthenticated);
    navigation.replace('Main');
  };
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={require('../assets/logo-parking.png')} style={styles.logo} />
        <Text style={styles.title}>¡Hola!</Text>
        <Text style={styles.subtitle}>
          Ingresa tus datos para <Text style={{ fontWeight: 'bold' }}>iniciar sesión</Text>.
        </Text>

        <Text style={styles.label}>Usuario: código de alumno UTP</Text>
        <TextInput
          mode="outlined"
          placeholder="Ingresa tu código UTP"
          value={code}
          onChangeText={setCode}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />
        <Text style={styles.helper}>Ejemplo de usuario: U1533148 (no digitar el @utp.edu.pe)</Text>

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          mode="outlined"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />

        <TouchableRipple onPress={() => console.log('Restablecer contraseña')}>
          <Text style={styles.link}>Restablecer contraseña</Text>
        </TouchableRipple>

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          {/* disabled={!code || !password} */}
          Iniciar sesión
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#444',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  input: {
    marginBottom: 12,
  },
  helper: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  link: {
    color: '#6a0dad',
    textAlign: 'right',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#cbd3e0',
    paddingVertical: 6,
  },
});

export default LoginScreen;
