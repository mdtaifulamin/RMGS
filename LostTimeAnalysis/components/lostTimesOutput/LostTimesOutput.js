import { StyleSheet, Text, View, Dimensions } from "react-native";

import LostTimesList from "./LostTimesList";
import LostTimesSummery from "./LostTimesSummery";
import { GlobalStyles } from "../../../constants/styles";
import NightSkyBackground from "../../../components/ColoredCircle";

const screen_height = Dimensions.get('screen').height

export default function LostTimesOutput({lostTimes, lostTimesPeriod,fallbackText, refreshing, onRefresh}){
    
    let content =<Text style={styles.infoText}>{fallbackText}</Text>;
    if(lostTimes.length > 0){
       content =<LostTimesList lostTimes={lostTimes}  refreshing={refreshing} onRefresh={onRefresh} />
    
   }

   //console.log(content)
   
    return(
        <View style={styles.container}>
            {content}
        </View>
    )

}

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:screen_height*0.012,
        paddingBottom:0,
        marginBottom:screen_height*0.07,
        
    },
    infoText:{
        color: GlobalStyles.colors.textcolor ,
        fontSize: 16,
        textAlign:'center',
        marginTop:32,
    }
})