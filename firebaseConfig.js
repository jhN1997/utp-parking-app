// firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGeBM6Dbbh3DXMw6hceSRFF7yj2JZ4gxY',
  authDomain: 'utp-parking-app.firebaseapp.com',
  projectId: 'utp-parking-app',
  storageBucket: 'utp-parking-app.firebasestorage.app',
  messagingSenderId: '305875209684',
  appId: '1:305875209684:web:5f9bd1b33e6be252d7da41',
};

const app = initializeApp(firebaseConfig);

// ✅ Configuración correcta de auth para React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
