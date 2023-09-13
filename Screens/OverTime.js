import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageOverTime from '../OverTimeAnalysis/Screens/manageoverTime'
import RecentoverTimes from '../OverTimeAnalysis/Screens/recentoverTimes';
import AlloverTimes from '../OverTimeAnalysis/Screens/AlloverTimes';
import { GlobalStyles } from '../constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import IconButton from '../OverTimeAnalysis/components/UI/iconButton';
import OverTimesContextProvider from '../OverTimeAnalysis/Store/overTimes-context';


const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const OverTimeOverview = () =>{
  return <Bottomtabs.Navigator screenOptions={({navigation})=>({
          tabBarActiveBackgroundColor:GlobalStyles.colors.tabBarActiveColor,
          headerStyle:{ backgroundColor: GlobalStyles.colors.headerColor},
          headerTintColor:GlobalStyles.colors.textcolor,
          tabBarStyle:{
            height: screenHeight * 0.06,
            marginHorizontal: screenWidth * 0.03,
            marginBottom: screenHeight * 0.01,
            borderRadius: 20,
            elevation: 50,
            backgroundColor: GlobalStyles.colors.tabBarActiveColor,
            position: 'absolute',
            shadowOffset:(1,0)
          },
          //tabBarActiveTintColor:GlobalStyles.colors.tabBarActiveColor,
          headerLeft:({tintColor})=> <IconButton icon="arrow-back-outline" size={24} color={tintColor} onPress={()=>{ navigation.navigate('IEDepartment')}} />,
          headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ navigation.navigate('ManageOverTime')}} />
         })}>
              <Bottomtabs.Screen 
              name='Recent OverTimes' 
              component={RecentoverTimes}
              options={{
                title:'BLOCKWISE OVER_TIME',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='hourglass-outline' size={size} color={color}/>
                ),
              }}/>
              
              <Bottomtabs.Screen 
              name='All OverTimes'  
              component={AlloverTimes} 
              options={{
                title:'LINEWISE OVER_TIME',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='calendar' size={size} color={color}/>
                ),
              }}/>
        </Bottomtabs.Navigator>
}
const OverTimePage = () => {
  return (
    <>
        <StatusBar style="dark" />
        <OverTimesContextProvider>
          {/* <NavigationContainer> */}
            <Stack.Navigator screenOptions={{
              headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
              headerTintColor:GlobalStyles.colors.textcolor,
            }}>

                <Stack.Screen 
                name='OverTimesOverview' 
                component={OverTimeOverview} 
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name='ManageOverTime' 
                component={ManageOverTime} options={{
                  presentation:'modal',
                }}
                />
            
            </Stack.Navigator>

          {/* </NavigationContainer> */}
        </OverTimesContextProvider>
      </>
      
    
  );
}
export default OverTimePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});