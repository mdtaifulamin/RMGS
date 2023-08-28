import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "./firebase";
import { getFormattedDate, momentTime } from "./EfficiencyAnalysis/util/date";




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
      userName:data.userName,
      date:  data.date,
      Admin: data.Admin?data.Admin:false,
      HRDepartment:data.HRDepartment?data.HRDepartment:false,
      IEDepartment: data.IEDepartment?data.IEDepartment:false,
      ProductionDepartment: data.ProductionDepartment? data.ProductionDepartment:false,
      QualityDepartment: data.QualityDepartment?data.QualityDepartment:false,
      efficiencyAnalysis: data.efficiencyAnalysis?data.efficiencyAnalysis:false,
      Overtime: data.Overtime?data.Overtime:false,
      target:data.target?data.target:false,
      newOperatorAssessment: data.newOperatorAssessment?data.newOperatorAssessment:false,
      block:data.block?data.block:'',
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   return [{"ID": "1", "password": "n", "userName": "Admin"}];
  }
  //console.log(efficiencies[0].ID)
  return efficiencies;
 }
 export const fetchUserInfoForSignUp = async(ID)=>{
  const q =  query(collection(database, "userInfo"),where("ID","==",ID)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
    //console.log(data)
     const efficiencyobj= {
      ID:data.ID,
      password: data.password, 
      userName:data.userName?data.userName:false,
      permissions:data.permissions?data.permissions:false
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   return [{"ID": "1", "password": "n", "userName": "Admin"}];
  }
  //console.log(efficiencies[0].ID)
  return efficiencies;
 }

 export const fetchUserInfoBYDate = async(date)=>{
  const q =  query(collection(database, "userInfo"),where("date",">",date)); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
 
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
    console.log(data)
    //console.log(data)
     const efficiencyobj= {
      id:doc.id,
      ID:data.ID,
      password: data.password, 
      userName:data.userName?data.userName:false,
      permissions:data.permissions?data.permissions:false
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   return [{"ID": "1", "password": "n", "userName": "Admin"}];
  }
  //console.log(efficiencies[0].ID)
  return efficiencies;
 }

 export const fetchAssesment = async(Fromdate,toDate)=>{
  console.log((new Date(Fromdate))+ " to" + toDate)
  const q =  query(collection(database, "data"),where("date",">=",new Date(getFormattedDate(Fromdate))),where("date","<",new Date(getFormattedDate(toDate)))); //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    const data= doc.data();
    //console.log(data)
     const efficiencyobj= {
      NIDNumber:data.NIDNumber,
      applicantName:data.applicantName,
      date:momentTime(data.date),
      department: data.department,
      factorySMV:data.factorySMV,
      machineName:data.machineName,
      processName:data.processName,
      processTime:data.processTime,
      rating:data.rating
      // password: data.password, 
      // userName:data.userName,
      // permissions:data.permissions
      };
    efficiencies.push(efficiencyobj)
    
       })
  }else{
   return [{"ID": "1", "password": "n", "userName": "Admin"}];
  }
  console.log(efficiencies)
  return efficiencies;
 }
 
