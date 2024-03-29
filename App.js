import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { UserProvider } from './components/Store/UserContext';
import { ThemeProvider } from './ThemeContext';
import LoginScreen from './Screens/LoginPage';
import HomeScreen from './Screens/HomePage';
import ProfileScreen from './Screens/ProfilePage';
import AdminScreen from './Screens/AdminPage';
import IEDepartmentPage from './Screens/IEDepartment';
import ProductionDepartmentPage from './Screens/ProductionDepartment';
import QualityDepartmentPage from './Screens/QualityDepartment';
import HRDepartmentPage from './Screens/HRDepartment';
import EfficiencyAnalysisPage from './Screens/EfficiencyAnalysis'; 
import SignupWaitingPage from './Screens/SignUpWaiting';
import SignupPage from './Screens/SignUp';
import TargetPage from './Screens/Target';
import OverTimePage from './Screens/OverTime';
import NewOperatorAssessmentPage from './Screens/NewOperatorAssessment';
import BottomTabNavigator from './components/BottomTabNavigator';
import LostTimeAnalysisPage from './Screens/LostTimeAnalysis';
import { OTProvider } from './components/Store/OTcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState ,useEffect,useContext} from 'react';
import Loadingspinner from './EfficiencyAnalysis/components/UI/loading';
import UserContext from './components/Store/UserContext';
import DeveloperMeetScreen from './Screens/Developermeet';
import { storeUserInfo } from './data-storing';
import MachineStatusScanner from './Screens/MachineStatusScanner'
import EngineeringDepartment from './Screens/EngineeringDepartment';
import MachineLocationSearching from './Screens/machineLocationSearching';
import LocationWiseMachineQTY from './Screens/LocationWiseMachineQTY';
import GarmentsUnit from './Screens/GarmentsUnit';
import FabricUnit from './Screens/FabricUnit';
import HourlyProductionContainer from './Screens/HourlyProductionContainer';
import CapacityAnalysisContainer from './Screens/CapacityAnalysisContainer';
const Stack = createStackNavigator();

export function Root(){
 const [login,setLogin]=useState(false)
 const [loading, setLoading] = useState(true);
 const { userInfo, updateUser } = useContext(UserContext);
  
  console.log(userInfo)
  const route=login===true?"Home":'Login'
  //console.log(JSON.stringify(userInfo)+route + login)
  if (loading) {
    // If still loading, show LoadingScreen
    return <Loadingspinner/>;
  }
  return (
    <ThemeProvider>
      <OTProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={route}
            screenOptions={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerTintColor: '#000', // Text color
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupPage} />
            <Stack.Screen name="SignupWaiting" component={SignupWaitingPage} />
            <Stack.Screen name="Home" component={HomeScreen} options={{  headerRight: () => null }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Your Profile' }} />
            <Stack.Screen name="AdminPage" component={AdminScreen} options={{ title: 'Home' , headerShown:false}} />
            <Stack.Screen name="IEDepartment" component={IEDepartmentPage} options={{ title: 'Home'  }} />
            <Stack.Screen name="ProductionDepartment" component={ProductionDepartmentPage} options={{ title: 'Production Department' }} />
            <Stack.Screen name="QualityDepartment" component={QualityDepartmentPage} options={{ title: 'Home' }} />
            <Stack.Screen name="HRDepartment" component={HRDepartmentPage} options={{ title: 'HR Department' }} />
            <Stack.Screen name="EngineeringDepartment" component={EngineeringDepartment} options={{ title: 'Home' }} />
            <Stack.Screen name="MachineStatusScanner" component={MachineStatusScanner} options={{ title: 'Machine Scanning ' }} />
            <Stack.Screen name="EfficiencyAnalysis" component={EfficiencyAnalysisPage} options={{ title: 'Efficiency Analysis' , headerShown:false}} />
            <Stack.Screen name="LostTimeAnalysis" component={LostTimeAnalysisPage} options={{ title: 'Lost Time Analysis' , headerShown:false}} />
            <Stack.Screen name="Target" component={TargetPage} options={{ title: 'Target' }} />
            <Stack.Screen name="OverTime" component={OverTimePage} options={{ title: 'Over Time', headerShown:false}} />
            <Stack.Screen name="developermeet" component={DeveloperMeetScreen} options={{ title: 'Developer Meet', headerShown:false}} />
            <Stack.Screen name="machineLocationSearching" component={MachineLocationSearching} options={{ title: 'Engineering Department'}} />
            <Stack.Screen name="FabricUnit" component={FabricUnit} options={{ title: 'Engineering Department'}} />
            <Stack.Screen name="GarmentsUnit" component={GarmentsUnit} options={{ title: 'Engineering Department'}} />
            <Stack.Screen name="LocationWiseMachineQTY" component={LocationWiseMachineQTY} options={{ title: 'Engineering Department'}} />
            <Stack.Screen name="HourlyProductionContainer" component={HourlyProductionContainer} options={{title:"SEWING PRODUCTION"}}/>
            <Stack.Screen name="CapacityAnalysisContainer" component={CapacityAnalysisContainer} options={{title:"CAPACITY ANALYSIS"}}/>
            {/* <Stack.Screen name="NewOperatorAssessment" component={NewOperatorAssessmentPage} options={{ title: 'IE' }} /> */}
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ title: 'IE' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </OTProvider>
    </ThemeProvider>
  );
};

export default function App(){
  return (
    <UserProvider>
      <Root/>
    </UserProvider>
  )
    
  
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    elevation: 0, // Remove shadow on Android
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});



