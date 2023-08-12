import { collection, addDoc ,} from "firebase/firestore"; 
import { database } from "./firebase";

export const   StoreData =async(inputs)=>{
    const docRef = await addDoc(collection(database, "data"), inputs
      );
}