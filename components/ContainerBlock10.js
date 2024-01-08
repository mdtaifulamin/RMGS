import { useState } from "react"
import { Text, View, StyleSheet, TextInput, ScrollView, Button, Dimensions, Alert } from "react-native"
import {store_line_data} from './server_activity';
import LoadingOverlay from './LoadingOverlay'

let screen_height = Dimensions.get('window').height
let screen_width = Dimensions.get("window").width

function ContainerBlock10({line_no, hour, currentHour}){
    // console.log(line_no)
    // console.log(hour)
    const day = new Date()
    const enteredDate = day.toLocaleDateString()
    // console.log(enteredDate)
    const complete_data = []

    ////////////////// Variable Declaration //////////////////
        // For line 1
        const [target_1, setTarget_1] = useState('')
        const [production_1, setProduction_1] = useState('')
        const [issue_1, setIssue_1] = useState('')

        // For line 2
        const [target_2, setTarget_2] = useState('')
        const [production_2, setProduction_2] = useState('')
        const [issue_2, setIssue_2] = useState('')

        // For line 3
        const [target_3, setTarget_3] = useState('')
        const [production_3, setProduction_3] = useState('')
        const [issue_3, setIssue_3] = useState('')

        // For line 4
        const [target_4, setTarget_4] = useState('')
        const [production_4, setProduction_4] = useState('')
        const [issue_4, setIssue_4] = useState('')

        // For line 5
        const [target_5, setTarget_5] = useState('')
        const [production_5, setProduction_5] = useState('')
        const [issue_5, setIssue_5] = useState('')

        // For line 6
        const [target_6, setTarget_6] = useState('')
        const [production_6, setProduction_6] = useState('')
        const [issue_6, setIssue_6] = useState('')

        // For line 7
        const [target_7, setTarget_7] = useState('')
        const [production_7, setProduction_7] = useState('')
        const [issue_7, setIssue_7] = useState('')

        // For line 8
        const [target_8, setTarget_8] = useState('')
        const [production_8, setProduction_8] = useState('')
        const [issue_8, setIssue_8] = useState('')

        // For line 9
        const [target_9, setTarget_9] = useState('')
        const [production_9, setProduction_9] = useState('')
        const [issue_9, setIssue_9] = useState('')

        // For line 10
        const [target_10, setTarget_10] = useState('')
        const [production_10, setProduction_10] = useState('')
        const [issue_10, setIssue_10] = useState('')


        //For Loading Overlay
        const [isSubmitting, setIsSubmitting] = useState(false)

    /////////////// Get Data Function /////////////////
        // For line 1
        function getTarget_1(target){
            setTarget_1(target)
        }
        function getProduction_1(prod){
            setProduction_1(prod)
        }
        function getIssue_1(issue){
            setIssue_1(issue)
        }
        // For line 2
        function getTarget_2(target){
            setTarget_2(target)
        }
        function getProduction_2(prod){
            setProduction_2(prod)
        }
        function getIssue_2(issue){
            setIssue_2(issue)
        }
        // For line 3
        function getTarget_3(target){
            setTarget_3(target)
        }
        function getProduction_3(prod){
            setProduction_3(prod)
        }
        function getIssue_3(issue){
            setIssue_3(issue)
        }
        // For line 4
        function getTarget_4(target){
            setTarget_4(target)
        }
        function getProduction_4(prod){
            setProduction_4(prod)
        }
        function getIssue_4(issue){
            setIssue_4(issue)
        }
        // For line 5
        function getTarget_5(target){
            setTarget_5(target)
        }
        function getProduction_5(prod){
            setProduction_5(prod)
        }
        function getIssue_5(issue){
            setIssue_5(issue)
        }
        // For line 6
        function getTarget_6(target){
            setTarget_6(target)
        }
        function getProduction_6(prod){
            setProduction_6(prod)
        }
        function getIssue_6(issue){
            setIssue_6(issue)
        }
        // For line 7
        function getTarget_7(target){
            setTarget_7(target)
        }
        function getProduction_7(prod){
            setProduction_7(prod)
        }
        function getIssue_7(issue){
            setIssue_7(issue)
        }
        // For line 8
        function getTarget_8(target){
            setTarget_8(target)
        }
        function getProduction_8(prod){
            setProduction_8(prod)
        }
        function getIssue_8(issue){
            setIssue_8(issue)
        }
        // For line 9
        function getTarget_9(target){
            setTarget_9(target)
        }
        function getProduction_9(prod){
            setProduction_9(prod)
        }
        function getIssue_9(issue){
            setIssue_9(issue)
        }
        // For line 10
        function getTarget_10(target){
            setTarget_10(target)
        }
        function getProduction_10(prod){
            setProduction_10(prod)
        }
        function getIssue_10(issue){
            setIssue_10(issue)
        }

    const allTarget = [Number(target_1), Number(target_2), Number(target_3), Number(target_4), Number(target_5), Number(target_6), Number(target_7), Number(target_8), Number(target_9), Number(target_10)]
    const allProduction = [Number(production_1), Number(production_2), Number(production_3), Number(production_4), Number(production_5), Number(production_6), Number(production_7), Number(production_8), Number(production_9), Number(production_10)]
    const allIssues = [issue_1, issue_2, issue_3, issue_4, issue_5, issue_6, issue_7, issue_8, issue_9, issue_10]

    for(const key in line_no){
        const items = {
            target:allTarget[key],
            production: allProduction[key],
            issue: allIssues[key],
            uploadTime: currentHour
        }
        complete_data.push(items)
    }


    async function send_data(){
        if (hour !== ''){
            setIsSubmitting(true)
            let errormsg = 'success'
            errormsg = await store_line_data(enteredDate.replace(/[/]/g,"-"), line_no, hour, complete_data)
            
            if(errormsg === 'success'){
                setTimeout(() => {setIsSubmitting(false)}, 3000)
            }
            else{
                Alert.alert('A Network Error Occured, Please try Again')
                setTimeout(() => {setIsSubmitting(false)}, 1000)
            }
        }
        else{
            Alert.alert("You Forgot To Enter Working Hour, Please Retry")
        }
    }

    if(isSubmitting){
          return <LoadingOverlay/>
    }
    
    return(
        <View>
            <ScrollView style={styles.scrollview}>
                {/* //////  1  ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No: {line_no[0]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_1}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_1}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_1}></TextInput>
                    </View>
                </View>
                {/* //////  2 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[1]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_2}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_2}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_2}></TextInput>
                    </View>
                </View>
                {/* ////// 3 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[2]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_3}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_3}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_3}></TextInput>
                    </View>
                </View>
                {/* ////// 4 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[3]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_4}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_4}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_4}></TextInput>
                    </View>
                </View>
                {/* ////// 5 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[4]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_5}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_5}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_5}></TextInput>
                    </View>
                </View>
                {/* ////// 6 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[5]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_6}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_6}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_6}></TextInput>
                    </View>
                </View>
                {/* ////// 7 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[6]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_7}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_7}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_7}></TextInput>
                    </View>
                </View>
                {/* ////// 8 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[7]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_8}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_8}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_8}></TextInput>
                    </View>
                </View>
                {/* ////// 9 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[8]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_9}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_9}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_9}></TextInput>
                    </View>
                </View>
                {/* ////// 10 ////// */}
                <View style={styles.mainContainer}>
                    <Text style={styles.linetext}>Line No. {line_no[9]}</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>TARGET</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getTarget_10}></TextInput>
                        </View>
                        <View style={styles.datafield}>
                            <Text style={styles.text}>PRODUCTION</Text>
                            <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={styles.textInput} keyboardType='numeric' onChangeText={getProduction_10}></TextInput>
                        </View>
                    </View>
                    <View style={styles.dataformbundle}>
                        <Text style={styles.text}>REMARKS</Text>
                        <TextInput  
                             multiline={true}
                             numberOfLines={1}
                            style={[styles.textInput, {width: screen_width*0.92}]} onChangeText={getIssue_10}></TextInput>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button title='SUBMIT' color={'#21d400'} onPress={send_data}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default ContainerBlock10

const styles = StyleSheet.create({
    mainContainer:{
        marginLeft:screen_width *  0.03,
        marginBottom: screen_width * 0.03,
    },
    textInput:{
        width: "100%",
        height: 40,
        borderWidth: 0.5,
        borderColor:"#6c757d",
        borderRadius:5,
        textAlign:'center',
        backgroundColor: 'white',
        fontSize: 16,

    },
    dataContainer:{
        flexDirection: 'row',
    },
    datafield:{
        paddingRight:20,
        width: "50%"
    },
    scrollview:{
        marginBottom: screen_height * 0.32,
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    linetext:{
        color:'#43aa8b',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button:{
        width: screen_width * 0.5,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 1,
    }
})