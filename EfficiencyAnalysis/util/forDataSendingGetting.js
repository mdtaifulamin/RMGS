import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database1,database } from "../../firebase";
import { getFormattedDate } from "./date";

export const storeEfficiency=async(efficiencyData)=>{
  const response = await addDoc(collection(database1, "efficiencies"), efficiencyData) ; 
  const id= response.id;
  return id;
}

export const fetchEfficiencies = async(date,value)=>{
  const sDate= getFormattedDate(date)                       //updated
  const datess=new Date(sDate)
  const block= value?value.map(String):['150']
  const q =  query(collection(database1, "efficiencies"),where("date","==",datess),where("lineNumber", "in",block)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const efficiencyobj= {
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
      hourMinusTNC:data.hourMinusTNC?data.hourMinusTNC:' ',
      hourTNC:data.hourTNC?data.hourTNC:' ',
      hour:       +(+data.hour).toFixed(6),
      production: +data.production,
      without:     +data.without,
      due:         +data.due,
      rejection:   +data.rejection,
      remarks: data.remarks?data.remarks:' '
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   console.log('no such data')
  }
  //console.log(efficiencies)
  return efficiencies.sort((a,b)=>{return b.lineNumber -a.lineNumber});
 }
 
export  async function deleteefficiency(id){
  await deleteDoc(doc(database1, "efficiencies", id));

}

export async function updateEfficiency (id,efficiencies){
  const up=  doc(database1, "efficiencies", id);
  await updateDoc(up,efficiencies);
}

export const fetchHours = async()=>{ 
  const docSnap = await getDocs(collection(database, "effhours"));
  const hours= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const efficiencyobj= {
      id:doc.id,
      bindings: data.bindings, 
      };
    hours.push(efficiencyobj)
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


 export const fetchLineEfficiencies = async(line,date)=>{
  const q =  query(collection(database1, "efficiencies"),where("lineNumber", "==",line),where("date",">",date)); 
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
     const efficiencyobj= {
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
    efficiencies.push(efficiencyobj)
   
       })
  }else{
   console.log('no such data')
  }
  return efficiencies.sort((a,b)=>{return b.date -a.date});
  
 }

 export const fetchEfficienciesByDate = async (date) => {
  const sDate= getFormattedDate(date)                       //updated
  const datess=new Date(sDate)
  
  const q =  query(collection(database1, "efficiencies"),where("date","==",datess)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const efficiencyobj= {
      lineNumber: +data.lineNumber, 
      date: data.date.toDate(),
      buyerName: data.buyerName,
      SO:        data.SO,
      daysRun: data.daysRun?data.daysRun:' ',
      styleName: data.styleName,
      itemName: data.itemName? data.itemName:' ',
      SMV:       +data.SMV,
      manpower:  +data.manpower,
      target10: data.target10? +data.target10:' ',
      hourMinusTNC:data.hourMinusTNC?+data.hourMinusTNC:' ',
      hourTNC:data.hourTNC?+data.hourTNC:' ',
      hour:       +(+data.hour).toFixed(6),
      production: +data.production,
      without:     +data.without,
      due:         +data.due,
      rejection:   +data.rejection,
      remarks: data.remarks?data.remarks:' '
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   console.log('no such data')
  }
  //console.log(efficiencies)
  return efficiencies.sort((a,b)=>{return a.lineNumber -b.lineNumber});
 }
 

