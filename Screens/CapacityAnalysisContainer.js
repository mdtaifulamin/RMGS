import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons"
import CapacityAnalysis from "./CapacityAnalysis";
import CapacityViewer from "./CapacityViewer";

const Tab = createBottomTabNavigator();

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

function CapacityAnalysisContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      initialRouteName="CAPACITY ANALYSIS RECORD"
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
          name="CAPACITY ANALYSIS RECORD"
          component={CapacityAnalysis}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="construct" size={26} color={"black"}/>
            )

          }}
        />
        <Tab.Screen 
            name="CAPACITY VIEWER" 
            component={CapacityViewer}
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

export default CapacityAnalysisContainer;