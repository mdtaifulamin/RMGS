import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "../../firebase";
import { database1 } from "../../firebase";
import { getFormattedDate } from "./date";

export const storeOverTime=async(overTimeData,Id)=>{
  const response = await setDoc(doc(database, "overTimes", Id), overTimeData);//await addDoc(collection(database, "overTimes"), overTimeData) ; 
  
  const id= Id;
  return id;
}

export const fetchOverTimes = async(date,value)=>{
  const sDate= getFormattedDate(date)                       //updated
  const datess=new Date(sDate)
  const block= value?value.map(String):['150']
  const q =  query(collection(database, "overTimes"),where("date","==",datess),where("lineNumber", "in",block)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const overTimes= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const overTimeobj= {
      id:doc.id,
      lineNumber: data.lineNumber?+data.lineNumber:0, 
      manpower:data.manpower?+data.manpower:0,
      date: data.date.toDate(),
      twoHourOT: data.twoHourOT?+data.twoHourOT:0,
      fourHourOT:  +data.fourHourOT,
      sixHourOT: +data.sixHourOT? +data.sixHourOT:' ',
      TNC:       +(+data.TNC)?+(+data.TNC):'',
      remarks: data.remarks?data.remarks:' '
      };
    overTimes.push(overTimeobj)
    
       })
  }else{
   console.log('no such data')
  }
  //console.log(overTimes)
  return overTimes.sort((a,b)=>{return b.lineNumber -a.lineNumber});
 }
 
export  async function deleteoverTime(id){
  await deleteDoc(doc(database, "overTimes", id));

}

export async function updateOverTime (id,overTimes){
  const up=  doc(database, "overTimes", id);
  await updateDoc(up,overTimes);
}

export const fetchHours = async()=>{ 
  const docSnap = await getDocs(collection(database, "hours"));
  const hours= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const overTimeobj= {
      id:doc.id,
      bindings: data.bindings, 
      };
    hours.push(overTimeobj)
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


 export const fetchLineOverTimes = async(line,date)=>{
  const q =  query(collection(database, "overTimes"),where("lineNumber", "==",line),where("date",">",date)); 
  const docSnap= await getDocs(q);
  const overTimes= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const overTimeobj= {
      id:doc.id,
      lineNumber: data.lineNumber?+data.lineNumber:'', 
      date: data.date.toDate(),
      twoHourOT:       +data.twoHourOT,
      fourHourOT:  +data.fourHourOT,
      sixHourOT: +data.sixHourOT? +data.sixHourOT:' ',
      TNC:       +(+data.TNC)?+(+data.TNC):'',
      remarks: data.remarks?data.remarks:' '
     };
    overTimes.push(overTimeobj)
   
       })
  }else{
   console.log('no such data')
  }
  return overTimes.sort((a,b)=>{return b.date -a.date});
  
 }