import { View, ActivityIndicator, StyleSheet } from "react-native"
import LottieView from 'lottie-react-native'


function LoadingOverlay(){
    return(
        <View style={styles.container}>
            <LottieView style={{width:150, height: 150}} source={require('../assets/loading.json')} autoPlay loop />
        </View>
    )
}

export default LoadingOverlay

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})