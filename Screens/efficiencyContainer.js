import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageEfficiency from '../EfficiencyAnalysis/Screens/manageefficiency'
import Recentefficiencies from '../EfficiencyAnalysis/Screens/recentefficiencies';
import Allefficiencies from '../EfficiencyAnalysis/Screens/Allefficiencies';
import { GlobalStyles } from '../EfficiencyAnalysis/constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import IconButton from '../EfficiencyAnalysis/components/UI/iconButton';
import EfficienciesContextProvider from '../EfficiencyAnalysis/Store/efficiencies-context';



const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

function EfficiencyOverview(){
  return <Bottomtabs.Navigator screenOptions={({navigation})=>({
          tabBarActiveBackgroundColor:'#c2f8cb',
          headerStyle:{ backgroundColor: GlobalStyles.colors.headerColor},
          headerTintColor:GlobalStyles.colors.text_border_button,
          tabBarStyle:{
            height: screenHeight * 0.06,
            marginHorizontal: screenWidth * 0.03,
            marginBottom: screenHeight * 0.01,
            borderRadius: 10,
            elevation: 3,
            backgroundColor: '#f0fff1',
            position: 'absolute'
          },
          tabBarActiveTintColor:GlobalStyles.colors.accent500,
          headerLeft:({tintColor})=> <IconButton icon="arrow-back-outline" size={24} color={tintColor} onPress={()=>{ navigation.navigate('HOME')}} />,
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

export default function EfficiencyContainer() {
  return (
      <>
        <StatusBar style="dark" />
        <EfficienciesContextProvider>
          {/* <NavigationContainer> */}
            <Stack.Navigator screenOptions={{
              headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
              headerTintColor:GlobalStyles.colors.text_border_button,
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


