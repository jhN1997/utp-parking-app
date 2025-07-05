import { auth } from '@firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput, TouchableRipple } from 'react-native-paper';
import { logoutAndClear } from 'services/authService';
import { getUserDataByUID } from 'services/userService';
import { emailDomain } from 'utils/enums';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [code, setCode] = React.useState('U21213982');
  const [password, setPassword] = React.useState('123456');
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, logout } = useAuth();

  const handleLogin = async () => {
    if (!code || !password) {
      Alert.alert('Error', 'Por favor ingresa tu código UTP y contraseña');
      return;
    }

    const email = `${code}${emailDomain}`.toLowerCase().trim(); // Asume que el código se convierte en correo institucional

    try {
      await logoutAndClear();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await userCredential.user.reload();
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          'Correo no verificado',
          'Tu correo electrónico no está verificado. ¿Deseas reenviar el correo de verificación?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Reenviar',
              onPress: async () => {
                try {
                  await sendEmailVerification(userCredential.user);

                  Alert.alert('Correo enviado', 'Revisa tu bandeja de entrada.');
                } catch (err) {
                  Alert.alert('Error', 'No se pudo enviar el correo de verificación.');
                }
              },
            },
          ],
          { cancelable: false },
        );
        return; // No continuar al home
      }

      const userData = await getUserDataByUID(user.uid);
      if (!userData) {
        Alert.alert('Error', 'No se encontraron datos del usuario en Firestore.');
        return;
      }

      const authenticatedUser = {
        uid: user.uid,
        ...userData,
      };
      console.log('Datos del authenticatedUser:', authenticatedUser);
      login(authenticatedUser);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error de autenticación', error.message);
    }
  };

  const validateEmailVerified = () => {};

  const redirectToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={require('../assets/logo-parking.png')} style={styles.logo} />
        <Text style={styles.title}>¡Hola!</Text>
        <Text style={styles.subtitle}>
          Ingresa tus datos para <Text style={{ fontWeight: 'bold' }}>iniciar sesión</Text>.
        </Text>

        <Text style={styles.label}>Usuario: Código de Alumno UTP</Text>
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

        <TouchableRipple onPress={redirectToRegisterScreen}>
          <Text style={styles.link}>Crear una nueva cuenta</Text>
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
    backgroundColor: '#0b1c48',
    paddingVertical: 6,
  },
});

export default LoginScreen;
