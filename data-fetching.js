import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "./firebase";




export const fetchProcesses = async()=>{
    const q =  query(collection(database, "processes")); //,where("date","==",datess) where("lineNumber", "==","1")
    
    const docSnap= await getDocs(q);
    const name= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data().Processes;
     //console.log(data)
     data.forEach((dat)=>{
      
     const nameobj= {
      ID: dat.ID,
      processName: dat.ProcessName,
      factorySMV: dat.factorySMV,
      machineName: dat.machineName
      };
      
    name.push(nameobj)
    
       })})
  }else{
   console.log('no such data')
  }
  //console.log(name)
 const myArray =eval(name) ;
 console.log(myArray)
  return eval(myArray);
}