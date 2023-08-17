import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from '../constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import ManagePermission from '../PermissionAnalysis copy/Screens/managepermission';
import Recentpermissions from '../PermissionAnalysis copy/Screens/recentpermissions';
import Allpermissions from '../PermissionAnalysis copy/Screens/Allpermissions';
import IconButton from '../PermissionAnalysis copy/components/UI/iconButton';
import PermissionsContextProvider from '../PermissionAnalysis copy/Store/permissions-context';
const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const PermissionOverview = () =>{
  return <Bottomtabs.Navigator screenOptions={({navigation})=>({
          tabBarActiveBackgroundColor:GlobalStyles.colors.tabBarActiveColor,
          headerStyle:{ backgroundColor: GlobalStyles.colors.headerColor},
          headerTintColor:GlobalStyles.colors.textcolor,
          tabBarStyle:{
            height: screenHeight * 0.06,
            // marginHorizontal: screenWidth * 0.03,
            // marginBottom: screenHeight * 0.01,
            borderRadius: 10,
            elevation: 50,
            backgroundColor: GlobalStyles.colors.tabBarActiveColor,
            position: 'absolute',
            shadowOffset:(1,0)
          },
          //tabBarActiveTintColor:GlobalStyles.colors.tabBarActiveColor,
          headerLeft:({tintColor})=> <IconButton icon="arrow-back-outline" size={24} color={tintColor} onPress={()=>{ navigation.navigate('Home')}} />,
          headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ navigation.navigate('ManagePermission')}} />
         })}>
              <Bottomtabs.Screen 
              name='Recent Permissions' 
              component={Recentpermissions}
              options={{
                title:'Recent PERMISSION',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='hourglass-outline' size={size} color={color}/>
                ),
              }}/>
              
              <Bottomtabs.Screen 
              name='All Permissions'  
              component={Allpermissions} 
              listeners={{
                tabPress: e => {
                  // Prevent default action
                  e.preventDefault();
                },
              }}
              options={{
                title:'ALL PERMISSION',
                tabBarShowLabel: false,
                
                tabBarIcon:({color,size})=>(
                  <Ionicons name='calendar' size={size} color={color}/>
                ),
              }}/>
        </Bottomtabs.Navigator>
}

const AdminScreen = () => {
  return(
  <>
  <StatusBar style="dark" />
  <PermissionsContextProvider>
    {/* <NavigationContainer> */}
      <Stack.Navigator screenOptions={{
        headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
        headerTintColor:GlobalStyles.colors.textcolor,
      }}>

          <Stack.Screen 
          name='PermissionsOverview' 
          component={PermissionOverview} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name='ManagePermission' 
          component={ManagePermission} options={{
            presentation:'modal',
          }}
          />
      
      </Stack.Navigator>

    {/* </NavigationContainer> */}
  </PermissionsContextProvider>
  </>
  )
}



const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
});


export default AdminScreen;
