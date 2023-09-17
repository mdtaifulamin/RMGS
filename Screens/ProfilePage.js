import React, { useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import UserContext from '../components/Store/UserContext'; // Import UserContext
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const { userInfo, updateUser } = useContext(UserContext);

  useEffect(() => {
     // Call updateUser to update the user info in the context
    
    // Load userInfo from AsyncStorage
    AsyncStorage.getItem('userInfo')
      .then(userInfoString => {
        if (userInfoString) {
          const storedUserInfo = JSON.parse(userInfoString);
          updateUser(storedUserInfo);
          // Update your context or state with storedUserInfo
        }
      })
      .catch(error => console.log('Error loading user info:', error));
  
  }, []);

  const handleUpdateInfo = () => {
    // Create a new user info object
    const newUserInfo = {
      ID: "Admin",
      password: "Admin",
      permission: { admin: true, profile: true,home:true }, // Update permissions
    };

    // Call updateUser to update the user info in the context
    updateUser(newUserInfo);
    AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo))
    .catch(error => console.log('Error saving user info:', error));
  };
 
  return (
    <View>
      <Text>Profile Screen</Text>
      {userInfo && (
        <Text>User ID: {userInfo.ID}</Text>
      )}
      <Button title="Update Info" onPress={handleUpdateInfo} />
      <Button title="Admin" onPress={()=>{if(userInfo.permission.admin===true){navigation.navigate('Admin')}else{return;}}} />
      
    </View>
  );
};

export default ProfileScreen;
