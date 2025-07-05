import { signOut } from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { auth } from '../firebaseConfig'; // <- usa el mismo nombre que exportaste

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (userData) => {
    setAuthUser(userData);
  };

  const logout = async () => {
    try {
      await signOut(auth); // <- aquí usas 'auth' que viene de firebaseConfig.js
      setAuthUser(null);
      console.log('✅ Sesión cerrada');
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ auth: authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
