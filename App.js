import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import RegisterScreen from 'screens/RegisterScreen';
import { AuthProvider } from './context/AuthContext';
import MainDrawer from './navigators/MainDrawer'; // Drawer modularizado
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View
        style={{
          height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
          backgroundColor: '#000',
        }}
      />
      {/* Status bar encima del fondo */}
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainDrawer} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </>
  );
}
