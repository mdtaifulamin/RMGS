import React, { useState,useEffect ,useContext} from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet ,Switch} from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather icon library
import { useTheme } from '../ThemeContext'; // Import useTheme hook
import { darkTheme, lightTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserInfo } from '../forDataSendingGetting';
import UserContext from '../components/Store/UserContext'; 

const LoginScreen = ({ navigation }) => {
  const { userInfo, updateUser } = useContext(UserContext);
  //const  [login, setLogin]  = useState(false); 
  const { isDarkMode, setdarkmood } = useTheme(false);// Get theme context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [loginStatus, setLoginStatus] = useState('');
  const themeStyles = isDarkMode ? darkTheme : lightTheme; // Apply appropriate theme styles
  

  

  useEffect(() => {
    // Call updateUser to update the user info in the context
   // Load userInfo from AsyncStorage
   AsyncStorage.getItem('userInfo')
     .then(userInfoString => {
       if (userInfoString) {
         const storedUserInfo = JSON.parse(userInfoString);
         setUsername(storedUserInfo.ID.toString());
         setPassword(storedUserInfo.password.toString());
         //setLogin(storedUserInfo.login);
         // Update your context or state with storedUserInfo
         //console.log(storedUserInfo.ID)
       }
     })
     .catch(error => console.log('Error loading user info:', error));
     
 }, []);

 const handleLogin = async() => {  
 const auth1= await fetchUserInfo(username,password)
  
  if (eval(auth1[0])===undefined?false:auth1[0].ID===username) {
    updateUser(auth1[0])
    //console.log(userInfo)
    AsyncStorage.setItem('userInfo', JSON.stringify({...auth1[0],login:true}))
    .catch(error => console.log('Error saving user info:', error))
    navigation.navigate('Home');
    setLoginStatus('');
  } else if (username === 'user' && password === 'user') {
    navigation.navigate('Profile');
    setLoginStatus('');
  } else if (username === '' && password === '') {
    setLoginStatus('Please enter the required information');
  } else {
    setLoginStatus('Invalid username or password');
  }
  };
  const handleSignUp =()=>{
    navigation.navigate('SignUp')
  }

  return (
      <View  style={[styles.container,{backgroundColor:themeStyles.backgroundColor}]}>
      <Image source={require('../assets/RMGS2.gif')} style={styles.logo} />
      
      <TextInput
        style={[styles.input,{color:themeStyles.textColor}]}
        placeholderTextColor={themeStyles.placeHolderTextColor}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.passwordInput}>
        <TextInput
          style={[styles.passwordField,{color:themeStyles.textColor}]}
          placeholderTextColor={themeStyles.placeHolderTextColor}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
         style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color={themeStyles.textColor} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SignUpButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      {loginStatus ? <Text style={styles.errorText}> {loginStatus} </Text> : null}
      {/* <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: lightTheme.placeHolderTextColor, true: darkTheme.placeHolderTextColor }}
          thumbColor={isDarkMode ? darkTheme.placeHolderTextColor : lightTheme.placeHolderTextColor}
        /> */}
        <View style={{marginTop:'15%'}}>
              <Text> Version: 1.0 </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    
  },
  passwordInput: {
    width: '80%',
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
  },
  eyeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  SignUpButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#3897F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
