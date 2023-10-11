import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View ,Dimensions} from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { EfficienciesContext } from "../../Store/efficiencies-context";
import { useContext } from "react";
import NightSkyBackground from "../../../components/ColoredCircle";
import BrightSkyBackground from "../../../components/ColoredBackground";
const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
export default function EfficiencyItem({date,lineNumber,id,buyerName,hourTNC,hourMinusTNC,daysRun,SO,styleName,SMV,manpower,hour,production,without,due,rejection,}){
     const navigation=useNavigation();     
     function efficiencyPresshandler(){
         navigation.navigate('ManageEfficiency',{
            efficiencyId: id            
         });       
     }
     

     const efficiencyCtx= useContext(EfficienciesContext);
     let fFilteredEfficiencies=efficiencyCtx.efficiencies.filter(function(obj){
        return  obj.lineNumber==lineNumber && obj.date.toLocaleDateString()==date.toLocaleDateString();
    })
   
    
    //console.log(hourMinusTNC)
    const sFilteredEfficiencies=[];
    fFilteredEfficiencies.forEach((p)=>{
        //console.log(p)
    const Availableminute=p.manpower*(p.hour/10*p.hourTNC) *60;
  
    const earnedminute=(p.production+p.without+p.rejection-p.due)*p.SMV;
    const hour=p.hour/10*p.hourTNC;
    const hourMinusTNC=p.hour/10*p.hourMinusTNC;
    const target10=p.target10;
    const production=p.production+p.without-p.due+p.rejection;
    const totalWithout=p.without;
    const totalDue=p.due;
    sFilteredEfficiencies.push({
        Availableminute:Number(Availableminute),
        earnedminute:Number(earnedminute),
        hour:Number(hour),
        hourMinusTNC:Number(hourMinusTNC),
        target10:Number(target10),
        production:Number(production),
        totalWithout:Number(totalWithout),
        totalDue:Number(totalDue),
    })
})
//console.log(sFilteredEfficiencies);
const total=sFilteredEfficiencies.reduce(function myFunc(total, num) {
  return ({Availableminute: total.Availableminute + num.Availableminute,earnedminute:total.earnedminute+num.earnedminute,hour: total.hour+num.hour,target10:total.target10+num.target10,production:total.production+num.production,totalWithout:total.totalWithout+num.totalWithout,totalDue:total.totalDue+num.totalDue+num.totalWithout,hourMinusTNC:total.hourMinusTNC+num.hourMinusTNC})
  
})
console.log(total)

    
      
     const netproduction= production+without-due+rejection;
     //console.log('p'+total.production+' t '+(total.target10/10)*total.hour)
    return(

        <Pressable onPress={efficiencyPresshandler}  style={({pressed})=> pressed && styles.pressed} >
            <View style={[styles.rootEfficiencyItem]}>
                <View style={styles.lineDate}>
                    <View style={{}}> 
                        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <View style={styles.tproductionComponents}>
                            <Text style={styles.textBase}>Line: </Text>
                        </View>
                        <View style={styles.tproductionComponents}>
                            <Text style={[styles.textBase,{fontWeight:'bold'}]}> {lineNumber}</Text>
                        </View>
                        
                    </View> 
                    {/* <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={styles.textBase}>Days Run: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017}]}> {daysRun}</Text>
                    </View>   */}
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <View style={styles.tproductionComponents}>
                            <Text style={styles.textBase}>T. Hour:</Text>
                        </View>
                        <View style={styles.tproductionComponents}>
                            <Text style={[styles.textBase,{fontWeight:'bold',color:((+total.hour/hourTNC)==1)?GlobalStyles.colors.textcolor:GlobalStyles.colors.deleteButton}]}> {(+total.hour).toFixed(2)} </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <View style={styles.tproductionComponents}>
                            <Text style={styles.textBase}>T. Target: </Text>
                        </View>
                        <View style={styles.tproductionComponents}>
                            <Text style={[styles.textBase,{fontWeight:'bold',color:total.production<((total.target10/10)*total.hourMinusTNC+2)?GlobalStyles.colors.textcolor:GlobalStyles.colors.deleteButton}]}> {((total.target10/10)*total.hourMinusTNC).toFixed(0)} </Text>
                        </View>   
                    </View> 
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}>
                        <View style={styles.tproductionComponents}>  
                            <Text style={[styles.textBase]}>T. Prod.: </Text>
                        </View>
                        <View style={styles.tproductionComponents}>
                            <Text style={[styles.textBase,{fontWeight:'bold',color:total.production<((total.target10/10)*total.hour+2)?GlobalStyles.colors.textcolor:GlobalStyles.colors.deleteButton}]}> {total.production}</Text>
                        </View>
                    </View>  
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <View style={styles.tproductionComponents}> 
                            <Text style={[styles.textBase]}>T. without: </Text>
                        </View>
                        <View style={styles.tproductionComponents}> 
                            <Text style={styles.textBase}> {total.totalWithout}</Text>
                        </View>
                    </View>      
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <View style={styles.tproductionComponents}> 
                            <Text style={[styles.textBase]}>T. Due: </Text>
                        </View>
                        <View style={styles.tproductionComponents}> 
                            <Text style={styles.textBase}> {total.totalDue}</Text>
                        </View>
                    </View>                   
                </View>
                <View style={styles.productionContainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>  
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>Style Name:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{styleName}</Text>  
                        </View>
                    </View> 
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>  
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>SMV:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{SMV}</Text>  
                        </View>
                    </View> 
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>Style Production:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{netproduction}</Text>  
                        </View>
                    </View>  
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>Days Run: </Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}> {daysRun}</Text> 
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>Without</Text>
                        </View>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>{without} </Text>  
                        </View>   
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>Due</Text>
                        </View>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>{due} </Text>  
                        </View>   
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>Line Efficiency:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>{((total.earnedminute/total.Availableminute)*100).toFixed(2)} % </Text>  
                        </View>   
                    </View>
                </View>
            </View>
        </Pressable>        
    )
}


const styles= StyleSheet.create({
    pressed:{
        opacity:.75,
    },
    
    rootEfficiencyItem:{
        paddingTop:3,
        paddingLeft:10,
        marginVertical:screen_height*0.008/2,
        backgroundColor:GlobalStyles.colors.cardBackground1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        elevation:5, 
        //height:screen_height*0.19,
        height:screen_height*0.24
        
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
        justifyContent:'center',
        paddingTop:3,
        fontSize:screen_height*0.017,
        flex:.5,
        fontWeight:'bold',
        flexDirection:'column'
    },
    productionContainer:{
        paddingLeft:screenWidth*0.022,
        paddingVertical:1,
        marginRight:screenWidth*0.001,
        backgroundColor:GlobalStyles.colors.cardBackground2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        minWidth:70,
        flex:.65,
        elevation:5,
        shadowColor:'gray'
    },
    production:{
        color: GlobalStyles.colors.textcolor,
        //fontWeight:'bold',
        fontSize:screen_height*0.017
        
    },
    productionComponents:{
       // borderWidth:.051,
        borderColor:'gray',
        borderRadius:1,
        margin:screen_height*0.0001,
        padding:1,
        flex:1,
        //alignItems:'center'
    },
    tproductionComponents:{
        // borderWidth:.051,
         borderColor:'gray',
         borderRadius:1,
         padding:1,
         flex:0.5,
         //alignItems:'center'
     }
})