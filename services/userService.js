import { auth, db } from '@firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { emailDomain } from 'utils/enums';

/**
 * Registra un usuario en Firebase Auth y guarda los datos en Firestore.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña.
 * @param {Object} additionalData - Datos adicionales como nombre, rol, etc.
 */
export const registerUser = async (utpCode, password, additionalData) => {
  try {
    // Crear usuario en Firebase Authentication
    const email = `${utpCode}${emailDomain}`; // Asume que el código se convierte en correo institucional
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, 'users', uid), {
      email,
      ...additionalData,
      createdAt: new Date(),
    });
    await signOut(auth); // Muy importante para que la sesión no persista con estado viejo

    return uid;
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
    throw error;
  }
};

export const getUserDataByUID = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data(); // Retorna los datos del usuario
    } else {
      return null; // No encontrado
    }
  } catch (error) {
    console.error('Error obteniendo datos de usuario:', error);
    throw error;
  }
};
