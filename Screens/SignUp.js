import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity,Text,Dimensions,Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../PrimaryButtons';
import ButtonM from '../EfficiencyAnalysis/util/Button';
import { storeUserInfo } from '../data-storing';
import { fetchUserInfo, fetchUserInfoForSignUp } from '../forDataSendingGetting';
import { getFormattedDate } from '../PermissionAnalysis copy/util/date';
import NightSkyBackground from '../components/ColoredCircle';


const screen_width = Dimensions.get("screen").width;
const screen_height = Dimensions.get("screen").height; // Set TextInput width to 90% of the screen width

const SignupPage = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Name, setName] = useState('');
    const [dept, setdept] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [modalText,setModaltext]=useState("Passwords don't match");
    const [loading,setLoading]=useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      // Check if all required fields are filled
      const isFieldsFilled = email && password && confirmPassword && Name && dept;
      setIsFormValid(isFieldsFilled && password === confirmPassword);
    }, [email, password, confirmPassword, Name, dept]);

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
    const handleSignup = async () => {
      if (password !== confirmPassword) {
        // Passwords don't match, show an error or alert
        setModaltext("Passwords don't match")
        setModalVisible(true)

        return;
      }
      try {
        //await firebase.auth().createUserWithEmailAndPassword(email, password);
        const auth1= await fetchUserInfoForSignUp(email)
        if (eval(auth1[0])===undefined?true:false) {
            const today = new Date()
            const userInfo= {ID:email,password:password, confirmed:false, userName:Name, dept:dept,permissions:'',date:new Date(today)};
            console.log(eval(auth1[0]))
            storeUserInfo(userInfo);
            setLoading(false)
            navigation.navigate('SignupWaiting');
        }else{
        // Navigate to the signup waiting page
       
        setModaltext('You already have an account')
        setModalVisible(true)
        setLoading(false)
            }

      } catch (error) {
        // Handle signup error, show an error or alert
        console.log("error")
        setLoading(false)
      }
    };
  
    return (
      <View style={styles.container}>
        
        <TextInput
          placeholder="ID/email"
          value={email.toUpperCase()}
          onChangeText={setEmail}
          style={styles.input}
        />
         <TextInput
          placeholder="Name"
          value={Name}
          onChangeText={setName}
          style={styles.input}
        />
         <TextInput
          placeholder="Department"
          value={dept}
          onChangeText={setdept}
          style={styles.input}
        />
        
        <View style={styles.passwordInput}>
            <TextInput
                style={[styles.passwordField]}
                
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#ccc" />
            </TouchableOpacity>
        </View>
        <View style={styles.passwordInput}>
            <TextInput
                style={[styles.passwordField]}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleConfirmPasswordVisibility}>
                <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#ccc" />
            </TouchableOpacity>
        </View>
        {/* <Button title="Signup" onPress={handleSignup} width={{width:screen_width*0.8}}/> */}
        <View style={{justifyContent:'center',alignItems:'center',marginTop:screen_height*0.1}}>
           {!loading && <PrimaryButton  onPress={()=>{handleSignup();setLoading(!loading)}} disabled={!isFormValid}  >Signup</PrimaryButton>}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Button title="OK" onPress={() => {setModalVisible(!modalVisible); setLoading(false)}} />
            </View>
          </View>
        </Modal>
        
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: screen_width * 0.8,
      height: 50,
      borderWidth: 1,
      borderColor: '#DBDBDB',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      color: 'black'
    },
    passwordInput: {
      width: screen_width * 0.8,
      height: 50,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#DBDBDB',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      
    },
    passwordField: {
      flex: 1,
      color:'black'
    },
    eyeIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
  });

export default SignupPage;