import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

export default function ShowProfile() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        cnic: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userUid = await AsyncStorage.getItem('Useruid');
                if (userUid) {
                    const userDoc = await firestore().collection('users').doc(userUid).get();
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        setUserInfo(userData);
                        console.log(userData)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once

    const logOut = async () => {
        await AsyncStorage.removeItem('UserActive');
        navigation.replace('login');
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View style={tw`my-4 items-center`}>
                <Image
                    style={tw`h-36 w-36 rounded-full`}
                    source={{
                        uri: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png',
                    }}
                />
                <TouchableOpacity onPress={() => navigation.push('editprofile')} style={tw`absolute top-24 right-8 bg-green-700 rounded-full p-2`}>
                    <Icon name="pencil" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg mb-2`}>Name</Text>
                <Text style={tw`text-xl`}>{userInfo.name}</Text>
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg mb-2`}>Email</Text>
                <Text style={tw`text-xl`}>{userInfo.email}</Text>
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg mb-2`}>Phone Number</Text>
                <Text style={tw`text-xl`}>{userInfo.phone}</Text>
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg mb-2`}>CNIC / Gender</Text>
                <Text style={tw`text-xl`}>{userInfo.cnic}</Text>
            </View>
            <TouchableOpacity onPress={() => logOut()} style={tw`p-4 bg-green-700 w-72 mx-auto rounded-lg`}>
                <Text style={tw`text-center text-lg text-white`}>Log Out</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}
