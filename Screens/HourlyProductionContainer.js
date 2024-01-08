import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Hourly_prod from "./Hourly_prod";
import Dashboard from "./Dashboard";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

function HourlyProductionContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      initialRouteName="HOURLY PRODUCTION"
      screenOptions={{
        // tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#c2f8cb',
        tabBarStyle:{
            height: screenHeight * 0.06,
            marginHorizontal: screenWidth * 0.03,
            marginBottom: screenHeight * 0.01,
            borderRadius: 10,
            elevation: 3,
            backgroundColor: '#f0fff1',
            position: 'absolute'
        }
      }}>
        <Tab.Screen
          name="HOURLY PRODUCTION"
          component={Hourly_prod}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="clipboard-outline" size={24} color={"black"}/>
            )

          }}
        />
        <Tab.Screen 
            name="DASHBOARD" 
            component={Dashboard}
            options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="save-outline" size={24} color={"black"}/>
                )
            }}    
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HourlyProductionContainer;