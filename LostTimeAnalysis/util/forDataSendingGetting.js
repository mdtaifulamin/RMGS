import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "../../firebase";
import { database1 } from "../../firebase";
import { getFormattedDate } from "./date";

export const storeLostTime=async(lostTimeData)=>{
  const response = await addDoc(collection(database, "lostTimes"), lostTimeData) ; 
  const id= response.id;
  return id;
}

export const fetchLostTimes = async(date,value)=>{
  const sDate= getFormattedDate(date)                       //updated
  const datess=new Date(sDate)
  const block= value?value.map(String):['150']
  const q =  query(collection(database, "lostTimes"),where("date","==",datess),where("lineNumber", "in",block)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const lostTimes= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const lostTimeobj= {
      id:doc.id,
      lineNumber: data.lineNumber, 
      date: data.date.toDate(),
      buyerName: data.buyerName,
      SO:        data.SO,
      daysRun: data.daysRun?data.daysRun:' ',
      styleName: data.styleName,
      itemName: data.itemName? data.itemName:' ',
      SMV:       +data.SMV,
      manpower:  +data.manpower,
      target10: data.target10? data.target10:' ',
      hour:       +(+data.hour).toFixed(6),
      production: +data.production,
      without:     +data.without,
      due:         +data.due,
      rejection:   +data.rejection,
      remarks: data.remarks?data.remarks:' '
      };
    lostTimes.push(lostTimeobj)
    
       })
  }else{
   console.log('no such data')
  }
  //console.log(lostTimes)
  return lostTimes.sort((a,b)=>{return b.lineNumber -a.lineNumber});
 }
 
export  async function deletelostTime(id){
  await deleteDoc(doc(database, "lostTimes", id));

}

export async function updateLostTime (id,lostTimes){
  const up=  doc(database, "lostTimes", id);
  await updateDoc(up,lostTimes);
}

export const fetchHours = async()=>{ 
  const docSnap = await getDocs(collection(database, "hours"));
  const hours= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const lostTimeobj= {
      id:doc.id,
      bindings: data.bindings, 
      };
    hours.push(lostTimeobj)
       })
  }else{
   console.log('no such data')
  }
  return hours[0].bindings;
 }

 export const fetchBuyer = async()=>{ 
  const docSnap = await getDocs(collection(database1, "buyer-name"));
  const name= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const nameobj= {
      name: data.name,
      name2: data.name2, 
      name3:data.Name3,
      };
      
    name.push(nameobj)
       })
  }else{
   console.log('no such data')
  }
 const myArray =eval(name) ;
 //console.log(myArray[0])
  return myArray;
 }


 export const fetchLineLostTimes = async(line,date)=>{
  const q =  query(collection(database, "lostTimes"),where("lineNumber", "==",line),where("date",">",date)); 
  const docSnap= await getDocs(q);
  const lostTimes= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const lostTimeobj= {
      id:doc.id,
      lineNumber: data.lineNumber, 
      date: data.date.toDate(),
      buyerName: data.buyerName,
      SO:        data.SO,
      daysRun: data.daysRun?data.daysRun:' ',
      styleName: data.styleName,
      itemName: data.itemName? data.itemName:' ',
      SMV:       +data.SMV,
      manpower:  +data.manpower,
      target10:data.target10?+data.target10:' ',
      hour:       +(+data.hour).toFixed(6),
      production: +data.production,
      without:     +data.without,
      due:         +data.due,
      rejection:   +data.rejection,
      remarks: data.remarks?data.remarks:' ' 
     };
    lostTimes.push(lostTimeobj)
   
       })
  }else{
   console.log('no such data')
  }
  return lostTimes.sort((a,b)=>{return b.date -a.date});
  
 }