import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Fontisto';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

export default function Login({ navigation }) {
  const [email, Setemail] = useState("")
  const [password, Setpassword] = useState("")

  const Login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        console.log('User account created & signed in!');
        console.log(user.user.uid)
        await AsyncStorage.setItem('UserActive', 'true');
        await AsyncStorage.setItem('Useruid', user.user.uid);

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Login Successful',
          textBody: <Text style={tw`text-lg`}>You have successfully logged in</Text>,
          autoClose: 10

        });
        setTimeout(() => {
          navigation.replace('main')
        }, 1000)

      })
      .catch(error => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Email or password Incorrect',
          textBody: <Text style={tw`text-sm text-red-600 font-bold`}>please check again email and password</Text>,
          autoClose: 10
        });


      });

  }
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled">

      <View style={tw`flex-1 w-full my-15`}>
        <View style={tw`mx-auto `}>
          <Image style={styles.image} source={require('../image/loginscreen.png')} />
        </View>
        <View style={tw`flex flex-col gap-4 w-5/6 mx-auto`}>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500 `}>
            <Icon name='email' size={20} style={tw`mr-1 text-blue-500 `} />
            <TextInput style={tw`flex-grow `} placeholder="Enter email address" onChangeText={(e) => Setemail(e)} />
          </View>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500  `}>
            <Icon name='locked' size={20} style={tw`mr-1 text-blue-500`} />
            <TextInput
              style={tw`flex-grow`}
              placeholder="Enter password"
              onChangeText={(e) => Setpassword(e)}


            />
          </View>
          {
            email !== "" && password !== "" ?
              <TouchableOpacity onPress={() => Login()} style={tw`rounded-lg w-full bg-blue-500 m-auto`}>
                <Text style={tw`text-white p-3 text-center text-xl`}>Login</Text>
              </TouchableOpacity> :
              <TouchableOpacity disabled style={tw`rounded-lg w-full bg-blue-300 m-auto`}>
                <Text style={tw`text-white p-3 text-center text-xl`}>Login</Text>
              </TouchableOpacity>
          }

          <View>
            <Text style={tw`text-center`}>Or sign in with</Text>
          </View>
          <TouchableOpacity style={tw`flex flex-row items-center rounded-lg w-full bg-white m-auto p-3 border-2 border-blue-500 `}>
            <Image style={tw`h-6 w-6`} source={require('../image/googlelogo.png')} />
            <Text style={tw`text-blue-500 mx-auto text-lg font-medium`}>Continue with Google</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-center text-black`}>New the app? <Text onPress={() => navigation.navigate('signup')} style={tw`text-blue-500 font-bold`}>Register</Text></Text>
          </View>
        </View>

      </View>
      <AlertNotificationRoot />

    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 'auto',
    width: 250,
    height: 250,
  },
});