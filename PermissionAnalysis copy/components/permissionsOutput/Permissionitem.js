import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View ,Dimensions} from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { PermissionsContext } from "../../Store/permissions-context";
import { useContext } from "react";
import NightSkyBackground from "../../../components/ColoredCircle";
const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
export default function PermissionItem({date,id,buyerName,daysRun,SO,styleName,SMV,manpower,hour,production,without,due,rejection,ID}){
     const navigation=useNavigation();     
     function permissionPresshandler(){
         navigation.navigate('ManagePermission',{
            permissionId: id            
         });       
     }
     

    //  const permissionCtx= useContext(PermissionsContext);
    //  let fFilteredPermissions=permissionCtx.permissions.filter(function(obj){
    //     return  obj.lineNumber==lineNumber && obj.date.toLocaleDateString()==date.toLocaleDateString();
    // })
   
    

//     const sFilteredPermissions=[];
//     fFilteredPermissions.forEach((p)=>{
//         //console.log(p)
//     const Availableminute=p.manpower* p.hour *60;
  
//     const earnedminute=(p.production+p.without+p.rejection-p.due)*p.SMV;
//     const hour=p.hour;
//     const target10=p.target10;
//     const production=p.production+p.without-p.due+p.rejection;
//     sFilteredPermissions.push({
//         Availableminute:Availableminute,
//         earnedminute:earnedminute,
//         hour:hour,
//         target10:target10,
//         production:production,
//     })
// })
// //console.log(sFilteredPermissions);
// const total=sFilteredPermissions.reduce(function myFunc(total, num) {
//   return ({Availableminute: total.Availableminute + num.Availableminute,earnedminute:total.earnedminute+num.earnedminute,hour: total.hour+num.hour,target10:total.target10+num.target10,production:total.production+num.production})
  
// })
// //console.log(total)

    
      
//      const netproduction= production+without-due+rejection;
//      //console.log('p'+total.production+' t '+(total.target10/10)*total.hour)
    return(

        <Pressable onPress={permissionPresshandler}  style={({pressed})=> pressed && styles.pressed} >
            <View style={[styles.rootPermissionItem]}>
               <Text>{ID}</Text>
            </View>
        </Pressable>        
    )
}


const styles= StyleSheet.create({
    pressed:{
        opacity:.75,
    },
    
    rootPermissionItem:{
        paddingTop:3,
        paddingLeft:10,
        marginVertical:screen_height*0.008/2,
        backgroundColor:GlobalStyles.colors.cardBackground1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        elevation:5, 
        height:screen_height*0.15,
        
    },
    textBase:{
        color:GlobalStyles.colors.textcolor,
        fontSize:screen_height*0.017
    },
    description:{
        fontSize:screen_height*0.017,
        marginBottom:4,
        fontWeight:'bold'
    },
    lineDate:{
        paddingTop:3,
        fontSize:screen_height*0.017,
        flex:.4,
        fontWeight:'bold',
        flexDirection:'column'
    },
    productionContainer:{
        paddingHorizontal:1,
        paddingVertical:1,
        backgroundColor:GlobalStyles.colors.cardBackground2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        minWidth:70,
        flex:.6,
        elevation:5,
        shadowColor:'gray'
    },
    production:{
        color: GlobalStyles.colors.textcolor,
        //fontWeight:'bold',
        
    },
    productionComponents:{
       // borderWidth:.051,
        borderColor:'gray',
        borderRadius:1,
        margin:screen_height*0.0001,
        padding:1,
        flex:1,
        alignItems:'center'
    }
})