import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewOperatorAssessmentPage from '../Screens/NewOperatorAssessment';// Import your "New Operator Assessment" screen component
import {  Ionicons,Entypo } from "@expo/vector-icons";
import AssesmentDownloadPage from '../Screens/AssesmentDownload';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator>
      {/* Add screens for your other options if needed */}
      <Tab.Screen name="NewOperatorAssessment" component={NewOperatorAssessmentPage} 
            options={{headerShown:false, tabBarIcon:({color,size})=>(
                  <Entypo name='new-message' size={size} color={color}/>
                ),}} />
      <Tab.Screen name="AssesmentDownload" component={AssesmentDownloadPage} options={{headerShown:false, tabBarIcon:({color,size})=>(
                  <Entypo name="download" size={24} color={color} />
                ),}} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
