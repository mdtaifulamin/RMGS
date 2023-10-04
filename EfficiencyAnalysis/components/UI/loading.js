import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

export default function Loadingspinner(){
     return(
        <View style={styles.container}>
            {/* <ActivityIndicator size="large" color='black' /> */}
           <Image source={require('./RMGS2.gif')} style={{height:250,width:250}}/>
        </View>
     )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.backgroundColor
    }
})