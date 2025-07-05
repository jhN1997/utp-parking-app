import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInAnonymously,
  signOut,
} from 'firebase/auth';

export async function registerUser(auth, email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // Enviar correo de verificación
  return await sendEmailVerification(user);
}

const auth = getAuth();

export const loginAnon = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log('Usuario anónimo autenticado:', result.user);
    return result.user;
  } catch (error) {
    console.error('Error en login anónimo:', error);
    throw error;
  }
};

export const logoutAndClear = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await signOut(auth); // cerrar sesión
  }
};
