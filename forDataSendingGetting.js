import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "./firebase";




export const fetchUserInfo = async(ID,pass)=>{
  const q =  query(collection(database, "userInfo"),where("ID","==",ID),where("password", "==",pass)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
    //console.log(data)
     const efficiencyobj= {
      ID:data.ID,
      password: data.password, 
      userName:data.userName
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   return [{"ID": "1", "password": "n", "userName": "Admin"}];
  }
  //console.log(efficiencies[0].ID)
  return efficiencies;
 }
 
