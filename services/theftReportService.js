import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function reportTheft(data) {
  await addDoc(collection(db, 'theft_reports'), data);
}

export async function getTheftReportsByUser(userId) {
  const q = query(collection(db, 'theft_reports'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
