import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View ,Dimensions} from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { OverTimesContext } from "../../Store/overTimes-context";
import { useContext } from "react";
import NightSkyBackground from "../../../components/ColoredCircle";
const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
export default function OverTimeItem({date,lineNumber,manpower, id,twoHourOT, fourHourOT, sixHourOT,Main_TNC, TNC_2,TNC_4,TNC_6,remarks}){
     const navigation=useNavigation();     
     function overTimePresshandler(){
         navigation.navigate('ManageOverTime',{
            overTimeId: id            
         });       
     }
   
    return(

        <Pressable onPress={overTimePresshandler}  style={({pressed})=> pressed && styles.pressed} >
            <View style={[styles.rootOverTimeItem]}>
                <View style={styles.lineDate}>
                    <View style={{}}> 
                        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                        <Text style={styles.textBase}>Line: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017}]}> {+lineNumber}</Text>
                    </View> 
                    <View style={{flexDirection:"row",marginTop:screen_height*0.001,paddingVertical:1}}> 
                         <Text style={styles.textBase}>Manpower:</Text>
                         <Text style={[styles.textBase,{fontWeight:'bold',fontSize:screen_height*0.017}]}> {+manpower} </Text>
                    </View>                      
                </View>
                <View style={styles.productionContainer}>
                    <Text style={{marginBottom:screen_height*0.02}}>Over Time Manpower Summary</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>  
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>2 Hour:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{+twoHourOT}</Text>  
                        </View>
                    </View> 
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>  
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>4 hour:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{+fourHourOT}</Text>  
                        </View>
                    </View> 
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>6 Hour:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                            <Text style={styles.production}>{+sixHourOT}</Text>  
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
    
    rootOverTimeItem:{
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