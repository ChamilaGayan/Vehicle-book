import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/register';
import LoginScreen from './src/screens/login';
import TPNO from './src/screens/tpno';
import OTP from './src/screens/otp';
import ForgotPw from './src/screens/forgotpw';
import StartScreen from './src/screens/start_screen';
import Profile from './src/screens/Profile';
import Dashboard from './src/screens/dashboard';
import Offering from './src/screens/offering';
import Booking from './src/screens/booking';
import Map from './src/screens/map';
import Vehicle from './src/screens/vehicle';
import Destination from './src/screens/booking_destination';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator  initialRouteName="StartScreen"> 
        <Stack.Screen
          name="Start Screen"
          component={StartScreen}
          options={{ title: 'Welcome!' }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }}/>
        <Stack.Screen name="TPNO" component={TPNO} options={{ title: 'Mobile Verification' }}/>
        <Stack.Screen name="OTP" component={OTP} options={{ title: 'OTP Verification' }}/>
        <Stack.Screen name="ForgotPw" component={ForgotPw} options={{ title: 'Password Reset' }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }}/>
        <Stack.Screen name="Offering" component={Offering} options={{ title: 'Offering' }}/>
        <Stack.Screen name="Booking" component={Booking} options={{ title: 'Booking' }}/>
        <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }}/>
        <Stack.Screen name="Vehicle" component={Vehicle} options={{ title: 'Vehicle' }}/>
        <Stack.Screen name="Destination" component={Destination} options={{ title: 'Destination' }}/>

      </Stack.Navigator>
    </NavigationContainer>
    // <RegisterScreen />
  )
};

export default App;