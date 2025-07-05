import { db } from '@firebaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export async function registerVehicle(vehicleData) {
  await addDoc(collection(db, 'vehicles'), vehicleData);
}

export async function getVehiclesByUserId(userId) {
  const q = query(collection(db, 'vehicles'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getVehicleById(vehiculoId) {
  console.log('Fetching vehicle with ID:', vehiculoId);
  const vehiculoRef = doc(db, 'vehicles', vehiculoId);
  const vehiculoSnap = await getDoc(vehiculoRef);

  if (vehiculoSnap.exists()) {
    return vehiculoSnap.data();
  } else {
    return null; // o lanza un error si prefieres
  }
}
