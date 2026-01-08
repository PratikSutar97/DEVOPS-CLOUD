import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "./config";

const productsRef = collection(db, "products");

/* READ PRODUCTS */
export async function fetchProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

/* READ UNIQUE CATEGORIES */
export async function fetchCategories() {
  const snapshot = await getDocs(productsRef);
  const categories = new Set();

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.category) categories.add(data.category);
  });

  return Array.from(categories);
}

/* CREATE */
export const addProduct = (data) => addDoc(productsRef, data);

/* DELETE */
export const deleteProduct = (id) =>
  deleteDoc(doc(db, "products", id));

/* UPDATE */
export const updateProduct = (id, data) =>
  updateDoc(doc(db, "products", id), data);

