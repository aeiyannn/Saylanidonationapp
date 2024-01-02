import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';


export default function Signup({ navigation }) {

  const [user, Setuser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: ""
  })

  const handlechg = (fieldName, e) => {
    Setuser({
      ...user, [fieldName]: e
    })
  }



  const Signup = async () => {
    console.log(user)
    try {
      const result = await auth().createUserWithEmailAndPassword(user.email, user.password);
      const userData = {
        uid: result.user.uid,
        name: user.name,
        email: user.email,
        profile: "",
        cnic: "XXXXX-XXXXXX-X",
        phone: "03XX-XXXXXXX"
      };

      // Save user data to Firestore
      await firestore().collection('users').doc(result.user.uid).set(userData);
      await AsyncStorage.setItem('UserActive', 'true');
      await AsyncStorage.setItem('Useruid', result.user.uid);

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Account Created Successful',
        textBody: <Text style={tw`text-lg`}>You have successfully logged in</Text>,
        autoClose: 10


      });
      setTimeout(() => {
        navigation.replace('main')
      }, 1000)
    }
    catch (error) {
      let err;
      if (error.code === 'auth/email-already-in-use') {
        err = 'That email address is already in use!'
      }

      if (error.code === 'auth/invalid-email') {
        err = 'That email address is invalid!'
      }
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Email or password Incorrect',
        textBody: <Text style={tw`text-lg text-red-600 font-bold`}>{error.code}</Text>,
        autoClose: 10
      });

      console.log(error);
    };
  }
  async function signInWithGoogle() {
    googleSigninFunc().then(data => {
      console.log('user data=>', data);
    });
  }

  const googleSigninFunc = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.configure({

        webClientId: "477463690348-v0prl5f9cu5h3epstjmrnpug6vjh89q6.apps.googleusercontent.com",
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
        accountName: '',

      })
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.signIn();

      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);
      return userInfo;


    }
    catch (e) {
      console.log(e)
    }

  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled">

      <View style={tw`flex-1 w-full`}>
        <View style={tw`mx-auto `}>
          <Image style={styles.image} source={require('../image/signupscreen.png')} />
        </View>
        <View style={tw`flex flex-col gap-4 w-5/6 mx-auto`}>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500 `}>
            <Icon1 name='user' size={20} style={tw`mr-1 text-blue-500 `} />
            <TextInput style={tw`flex-grow `} placeholder="Enter Name" onChangeText={(e) => handlechg('name', e)} />
          </View>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500  `}>
            <Icon name='email' size={20} style={tw`mr-1 text-blue-500`} />
            <TextInput
              style={tw`flex-grow`}
              placeholder="Enter Email"
              onChangeText={(e) => handlechg('email', e)}
            />
          </View>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500 `}>
            <Icon name='locked' size={20} style={tw`mr-1 text-blue-500 `} />
            <TextInput style={tw`flex-grow `} placeholder="Create Password" onChangeText={(e) => handlechg('password', e)} />
          </View>
          <View style={tw`flex flex-row items-center border-b-2 border-indigo-500 `}>
            <Icon name='email' size={20} style={tw`mr-1 text-blue-500 `} />
            <TextInput style={tw`flex-grow `} placeholder="Re-enter Password" onChangeText={(e) => handlechg('repassword', e)} />
          </View>
          {
            !!user.email && !!user.password && !!user.name && !!user.repassword ?

              <TouchableOpacity onPress={() => Signup()} style={tw`rounded-lg w-full bg-blue-500 m-auto`}>
                <Text style={tw`text-white p-3 text-center text-xl`}>Sign Up</Text>
              </TouchableOpacity> :
              <TouchableOpacity disabled style={tw`rounded-lg w-full bg-blue-300 m-auto`}>
                <Text style={tw`text-white p-3 text-center text-xl`}>Sign Up</Text>
              </TouchableOpacity>

          }

          <View>
            <Text style={tw`text-center`}>Or signup with</Text>
          </View>
          <TouchableOpacity onPress={() => signInWithGoogle()} style={tw`flex flex-row items-center rounded-lg w-full bg-white m-auto p-3 border-2 border-blue-500 `}>
            <Image style={tw`h-6 w-6`} source={require('../image/googlelogo.png')} />
            <Text style={tw`text-blue-500 mx-auto text-lg font-medium`}>Continue with Google</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-center text-black`}> Already Register? <Text onPress={() => navigation.navigate('login')} style={tw`text-blue-500 font-bold`}>Login</Text></Text>
          </View>
        </View>

      </View>

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
