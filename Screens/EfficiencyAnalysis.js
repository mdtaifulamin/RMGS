import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageEfficiency from '../EfficiencyAnalysis/Screens/manageefficiency'
import Recentefficiencies from '../EfficiencyAnalysis/Screens/recentefficiencies';
import Allefficiencies from '../EfficiencyAnalysis/Screens/Allefficiencies';
import { GlobalStyles } from '../constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import IconButton from '../EfficiencyAnalysis/components/UI/iconButton';
import EfficienciesContextProvider from '../EfficiencyAnalysis/Store/efficiencies-context';
import IEDepartmentPage from './IEDepartment';

const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const EfficiencyOverview = () =>{
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
          headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ navigation.navigate('ManageEfficiency')}} />
         })}>
              <Bottomtabs.Screen 
              name='Recent Efficiencies' 
              component={Recentefficiencies}
              options={{
                title:'BLOCKWISE EFFICIENCY',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='hourglass-outline' size={size} color={color}/>
                ),
              }}/>
              
              <Bottomtabs.Screen 
              name='All Efficiencies'  
              component={Allefficiencies} 
              options={{
                title:'LINEWISE EFFICIENCY',
                tabBarShowLabel: false,
                tabBarIcon:({color,size})=>(
                  <Ionicons name='calendar' size={size} color={color}/>
                ),
              }}/>
        </Bottomtabs.Navigator>
}
const EfficiencyAnalysisPage = () => {
  return (
    <>
        <StatusBar style="dark" />
        <EfficienciesContextProvider>
          {/* <NavigationContainer> */}
            <Stack.Navigator screenOptions={{
              headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
              headerTintColor:GlobalStyles.colors.textcolor,
            }}>

                <Stack.Screen 
                name='EfficienciesOverview' 
                component={EfficiencyOverview} 
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name='ManageEfficiency' 
                component={ManageEfficiency} options={{
                  presentation:'modal',
                }}
                />
            
            </Stack.Navigator>

          {/* </NavigationContainer> */}
        </EfficienciesContextProvider>
      </>
      
    
  );
}
export default EfficiencyAnalysisPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


