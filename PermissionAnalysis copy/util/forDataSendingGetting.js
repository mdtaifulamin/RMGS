import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database, database1 } from "../../firebase";
import { getFormattedDate } from "./date";

export const storePermission=async(permissionData)=>{
  const response = await addDoc(collection(database, "userInfo"), permissionData) ; 
  const id= response.id;
  return id;
}

export const fetchPermissions = async(date)=>{
  const sDate= getFormattedDate(date)                       //updated
  const datess=new Date(sDate)
  const q =  query(collection(database, "userInfo"),where("date",">",date));; //,where("date","==",datess) where("lineNumber", "==","1")
  
  const docSnap= await getDocs(q);
  const permissions= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const permissionobj= {
      id:doc.id,
      ID:data.ID?data.ID:'',
      password: data.password?data.password:'', 
      userName:data.userName?data.userName:'',
      dept:data.dept?data.dept:'',
      date: data.date? data.date:'',
      Admin: data.Admin?data.Admin:false,
      HRDepartment:data.HRDepartment?data.HRDepartment:false,
      IEDepartment: data.IEDepartment?data.IEDepartment:false,
      ProductionDepartment: data.ProductionDepartment? data.ProductionDepartment:false,
      QualityDepartment: data.QualityDepartment?data.QualityDepartment:false,
      efficiencyAnalysis: data.efficiencyAnalysis?data.efficiencyAnalysis:false,
      Overtime: data.Overtime?data.Overtime:false,
      target:data.target?data.target:false,
      newOperatorAssessment: data.newOperatorAssessment?data.newOperatorAssessment:false,
      };
    permissions.push(permissionobj)
    
       })
  }else{
   console.log('no such data')
  }
  //console.log(permissions)
  return permissions;
 }
 
export  async function deletepermission(id){
  await deleteDoc(doc(database, "userInfo", id));

}

export async function updatePermission (id,permissions){
  const up=  doc(database, "userInfo", id);
  await updateDoc(up,permissions);
}



 


 