import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageLostTime from '../LostTimeAnalysis/Screens/managelostTime'
import RecentlostTimes from '../LostTimeAnalysis/Screens/recentlostTimes';
import AlllostTimes from '../LostTimeAnalysis/Screens/AlllostTimes';
import { GlobalStyles } from '../constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import IconButton from '../LostTimeAnalysis/components/UI/iconButton';
import LostTimesContextProvider from '../LostTimeAnalysis/Store/lostTimes-context';


const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const LostTimeOverview = () =>{
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
          headerLeft:({tintColor})=> <IconButton icon="arrow-back-outline" size={24} color={tintColor} onPress={()=>{ navigation.navigate('IEDepartment')}} />,
          headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ navigation.navigate('ManageLostTime')}} />
         })}>
              <Bottomtabs.Screen 
              name='Recent LostTimes' 
              component={RecentlostTimes}
              options={{
                title:'BLOCKWISE LOST_TIME',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='hourglass-outline' size={size} color={color}/>
                ),
              }}/>
              
              <Bottomtabs.Screen 
              name='All LostTimes'  
              component={AlllostTimes} 
              options={{
                title:'LINEWISE LOST_TIME',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='calendar' size={size} color={color}/>
                ),
              }}/>
        </Bottomtabs.Navigator>
}
const LostTimeAnalysisPage = () => {
  return (
    <>
        <StatusBar style="dark" />
        <LostTimesContextProvider>
          {/* <NavigationContainer> */}
            <Stack.Navigator screenOptions={{
              headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
              headerTintColor:GlobalStyles.colors.textcolor,
            }}>

                <Stack.Screen 
                name='LostTimesOverview' 
                component={LostTimeOverview} 
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name='ManageLostTime' 
                component={ManageLostTime} options={{
                  presentation:'modal',
                }}
                />
            
            </Stack.Navigator>

          {/* </NavigationContainer> */}
        </LostTimesContextProvider>
      </>
      
    
  );
}
export default LostTimeAnalysisPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


