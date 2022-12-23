import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "../lib/config/firebase.config";
  
  
  const userUpdate = async (uid: any, nombre :any, rol: any) => { 
    try {
      const q = query(collection(db, "usuarios"), where("uid", "==", uid));
      const docs = await getDocs(q);
      if (!docs.empty) {
        const user = docs.docs.shift();
        if (user) {
          const userRef = user.ref;
          await updateDoc(userRef, {
            nombre: nombre,
            rol: rol,
          });
        }
      }
    } catch (error) {
      return "error";
    }
  };
  
  export { userUpdate };