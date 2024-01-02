import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
} from 'react-native-alert-notification';

export default function ShowProfile() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cnicGender, setCnicGender] = useState('');
    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
    const [uid, setUid] = useState(''); // Assuming you have the user's UID

    useEffect(() => {
        // Fetch user data from Firestore using the UID
        const fetchData = async () => {
            try {
                const userUid = await AsyncStorage.getItem('Useruid');
                setUid(userUid); // Set UID obtained from AsyncStorage

                const userDoc = await firestore().collection('users').doc(userUid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setName(userData.name || '');
                    setEmail(userData.email || '');
                    setPhoneNumber(userData.phone || '');
                    setCnicGender(userData.cnic || '');
                    setProfileImage(userData.profile || 'https://via.placeholder.com/150');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const pickImage = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setProfileImage(response.uri);
            }
        });
    };

    const saveChanges = async () => {
        console.log('Changes saved:', { name, email, phoneNumber, cnicGender, profileImage });

        try {
            const userData = {
                name,
                email,
                phoneNumber,
                cnicGender,
                profileImage,
            };

            // Update user data in Firestore using the UID
            await firestore().collection('users').doc(uid).update(userData);

            // Show React Native notification modal for successful update
            // Insert your notification logic here

            // Navigate back after saving changes

            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Account Edit Successful',
                textBody: <Text style={tw`text-lg`}>Your profile update successfully</Text>,
                autoClose: 10


            });
            setTimeout(() => {
                navigation.navigate('showprofile')
            }, 1000)


        } catch (error) {
            console.error('Error updating data:', error);
            // Handle error scenarios
        }
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mt-6 ml-4`}>
                <Icon name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View style={tw`items-center mt-6`}>
                <TouchableOpacity onPress={pickImage} style={tw`items-center`}>
                    <Image
                        style={tw`h-36 w-36 rounded-full`}
                        source={{
                            uri: profileImage || 'https://via.placeholder.com/150',
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg`}>Name</Text>
                <TextInput
                    style={tw`text-xl`}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter Name"
                />
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg`}>Email</Text>
                <TextInput
                    style={tw`text-xl`}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter Email"
                />
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg`}>Phone Number</Text>
                <TextInput
                    style={tw`text-xl`}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    placeholder="Enter Phone Number"
                />
            </View>
            <View style={tw`mx-4 border-b-2 border-gray-300 pb-4 mb-4`}>
                <Text style={tw`font-bold text-black text-lg`}>CNIC / Gender</Text>
                <TextInput
                    style={tw`text-xl`}
                    value={cnicGender}
                    onChangeText={(text) => setCnicGender(text)}
                    placeholder="Enter CNIC / Gender"
                />
            </View>
            <TouchableOpacity onPress={saveChanges} style={tw`p-4 bg-green-700 w-72 mx-auto rounded-lg`}>
                <Text style={tw`text-center text-lg text-white`}>Save Changes</Text>
            </TouchableOpacity>
            <AlertNotificationRoot />
        </KeyboardAwareScrollView>
    );
}
