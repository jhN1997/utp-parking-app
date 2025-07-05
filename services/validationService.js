import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function requestValidation(data) {
  await addDoc(collection(db, 'validations'), data);
}

export async function getValidationsByUser(userId) {
  const q = query(collection(db, 'validations'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
