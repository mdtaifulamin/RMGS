import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import EfficienciesList from "./EfficienciesList";
import EfficienciesSummery from "./EfficienciesSummery";


const screen_height = Dimensions.get('screen').height

export default function EfficienciesOutput({efficiencies, efficienciesPeriod,fallbackText, refreshing, onRefresh,onLongPress}){
    let content =<Text style={styles.infoText}>{fallbackText}</Text>;
    if(efficiencies.length > 0){
       content =<EfficienciesList efficiencies={efficiencies}  refreshing={refreshing} onRefresh={onRefresh} />
    
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
        backgroundColor: GlobalStyles.colors.primary700,
        
    },
    infoText:{
        color:'black',
        fontSize: 16,
        textAlign:'center',
        marginTop:32,
    }
})