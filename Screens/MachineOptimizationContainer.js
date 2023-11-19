import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MachineOptz from "./MachineOptz";
import BreakdownScanner from "./BreakdownScanner";
import {Ionicons} from "@expo/vector-icons"
import MachineStatusScanner from "./MachineStatusScanner";

const Tab = createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

function MachineOptimizationContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      initialRouteName="MACHINE DATABASE RECORD"
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
          name="MACHINE DATABASE RECORD"
          component={MachineOptz}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="construct" size={26} color={"black"}/>
            )

          }}
        />
        <Tab.Screen 
            name="IDLE TIME RECORD" 
            component={MachineStatusScanner}
            options={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="speedometer" size={26} color={"black"}/>
                )
            }}    
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MachineOptimizationContainer;