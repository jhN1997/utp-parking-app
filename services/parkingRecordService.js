import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path as necessary

export const createParkingRecord = async (recordData) => {
  const docRef = await addDoc(collection(db, 'parking_records'), recordData);
  return docRef.id; // ✅ Esto te dará el ID del nuevo documento
};

export async function getParkingHistoryByUser(userId) {
  const q = query(
    collection(db, 'parking_records'),
    where('userId', '==', userId),
    where('status', '==', 'IN'),
    limit(1),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).pop();
}

export async function updateParkingRecord(parkingId, dataToUpdate) {
  const parkingRef = doc(db, 'parking_records', parkingId);
  await updateDoc(parkingRef, dataToUpdate);
}
