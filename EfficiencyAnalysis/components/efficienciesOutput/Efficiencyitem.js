import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View ,Dimensions} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { EfficienciesContext } from "../../Store/efficiencies-context";
import { useContext } from "react";

const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
export default function EfficiencyItem({date,lineNumber,id,buyerName,daysRun,SO,styleName,SMV,manpower,hour,production,without,due,rejection,}){
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
   
    

    const sFilteredEfficiencies=[];
    fFilteredEfficiencies.forEach((p)=>{
        //console.log(p)
    const Availableminute=p.manpower* p.hour *60;
  
    const earnedminute=(p.production+p.without+p.rejection-p.due)*p.SMV;
    const hour=p.hour;
    const target10=p.target10;
    const production=p.production+p.without-p.due+p.rejection;
    sFilteredEfficiencies.push({
        Availableminute:Availableminute,
        earnedminute:earnedminute,
        hour:hour,
        target10:target10,
        production:production,
    })
})
//console.log(sFilteredEfficiencies);
const total=sFilteredEfficiencies.reduce(function myFunc(total, num) {
  return ({Availableminute: total.Availableminute + num.Availableminute,earnedminute:total.earnedminute+num.earnedminute,hour: total.hour+num.hour,target10:total.target10+num.target10,production:total.production+num.production})
  
})
//console.log(total)

    
      
     const netproduction= production+without-due+rejection;
     console.log('p'+total.production+' t '+(total.target10/10)*total.hour)
    return(

        <Pressable onPress={efficiencyPresshandler}  style={({pressed})=> pressed && styles.pressed} >
            <View style={[styles.rootEfficiencyItem,{}]}>
                <View style={styles.lineDate}>
                    <View style={{}}> 
                        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={styles.textBase}>Line: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017}]}> {lineNumber}</Text>
                    </View> 
                    {/* <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={styles.textBase}>Days Run: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017}]}> {daysRun}</Text>
                    </View>   */}
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                         <Text style={styles.production}>T. Hour:</Text>
                         <Text style={styles.production}> {(+total.hour).toFixed(2)} </Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={styles.textBase}>T. Target: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017,color:total.production<((total.target10/10)*total.hour+2)?GlobalStyles.colors.primary50:GlobalStyles.colors.deleteButton}]}> {((total.target10/10)*total.hour).toFixed(0)}</Text>
                    </View> 
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={[styles.textBase]}>T. Prod.: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017,color:total.production<((total.target10/10)*total.hour+2)?GlobalStyles.colors.primary50:GlobalStyles.colors.deleteButton}]}> {total.production}</Text>
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
        padding:3,
        marginVertical:screen_height*0.008/2,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        elevation:5, 
        height:screen_height*0.15,
        
    },
    textBase:{
        color:GlobalStyles.colors.primary50,
        fontSize:screen_height*0.017
    },
    description:{
        fontSize:screen_height*0.017,
        marginBottom:4,
        fontWeight:'bold'
    },
    lineDate:{
        fontSize:screen_height*0.017,
        flex:.4,
        fontWeight:'bold',
        flexDirection:'column'
    },
    productionContainer:{
        paddingHorizontal:1,
        paddingVertical:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        minWidth:70,
        flex:.6,
        elevation:5,
        shadowColor:'gray'
    },
    production:{
        color: GlobalStyles.colors.primary50,
        fontWeight:'bold',
        
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