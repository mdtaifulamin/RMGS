import { collection, addDoc ,async} from "firebase/firestore"; 
import { database } from "./firebase";

export const   StoreData =async(inputs)=>{
    const docRef = await addDoc(collection(database, "data"), inputs
      );
}