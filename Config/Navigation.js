import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../Screen/Signup';
import Login from '../Screen/Login';
import Main from '../Screen/Main';
import ShowProfile from '../Screen/Showprofile';
import EditProfile from '../Screen/EditProfile';
import {DonationForm} from '../Screen/SendDonationrequest';
import Splash from '../Screen/Splash';
import {HelpRequestForm} from '../Screen/HelpRequestForm';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen
          name="main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editprofile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="showprofile"
          component={ShowProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="senddonation"
          component={DonationForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="sendhelp"
          component={HelpRequestForm}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
