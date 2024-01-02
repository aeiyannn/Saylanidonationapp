import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {
    ALERT_TYPE, Dialog,
    AlertNotificationRoot
} from 'react-native-alert-notification';

export const HelpRequestForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cnic, setCnic] = useState('');
    const [donationType, setDonationType] = useState('');
    const [image, setImage] = useState('');

    const handleFormSubmit = async () => {
        // Prepare the donation data
        const donationData = {
            name,
            email,
            phoneNumber,
            cnic,
            donationType,
            image,
        };

        try {
            // Access userUid from AsyncStorage or wherever it's stored
            const userUid = await AsyncStorage.getItem('Useruid');

            // Add the donation data to Firestore with the userUid
            await firestore().collection('users').doc(userUid).collection('donations').add(donationData);

            // Show a notification modal after sending the donation
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Your Request Send Succesfully',
                textBody: <Text style={tw`text-lg text-red-600 font-bold`}>Admin will decide For Approved</Text>,
                autoClose: 10
            });

            // Clear the form fields after submission
            setName('');
            setEmail('');
            setPhoneNumber('');
            setCnic('');
            setDonationType('');
            setImage('');
        } catch (error) {
            console.error('Error submitting donation:', error);
            Alert.alert('Error', 'Failed to submit donation. Please try again.');
        }
    };

    return (
        <View style={tw`p-4 my-4`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>Donation Form</Text>

            <View style={tw`mb-4`}>
                <Text style={tw`text-sm mb-1`}>Name</Text>
                <TextInput
                    style={tw`border border-gray-300 p-2 rounded`}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name" />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-sm mb-1`}>Email</Text>
                <TextInput
                    style={tw`border border-gray-300 p-2 rounded`}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email" />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-sm mb-1`}>Phone Number</Text>
                <TextInput
                    style={tw`border border-gray-300 p-2 rounded`}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter your phone number" />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-sm mb-1`}>CNIC</Text>
                <TextInput
                    style={tw`border border-gray-300 p-2 rounded`}
                    value={cnic}
                    onChangeText={setCnic}
                    placeholder="Enter your CNIC" />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-sm mb-1`}>Donation Type</Text>
                <View style={tw`border border-gray-300  rounded`}>
                    <Picker

                        selectedValue={donationType}
                        onValueChange={(itemValue) => setDonationType(itemValue)}
                        labelStyle={{ color: 'blue' }}
                    >
                        <Picker.Item label="Cash" value="cash" />
                        <Picker.Item label="Food" value="food" />
                        <Picker.Item label="Cloth" value="cloth" />
                    </Picker>
                </View>

            </View>

            {donationType === "cash" ?
                <View style={tw`mb-4`}>
                    <Text style={tw`text-sm mb-1`}>Select Amount</Text>
                    <TextInput
                        style={tw`border border-gray-300 p-2 rounded`}
                        value={image}
                        onChangeText={setImage}
                        placeholder="Enter donation amount" />
                </View>
                :
                <View style={tw`mb-4`}>
                    <Text style={tw`text-sm mb-1`}>Upload Picture</Text>
                    <TextInput
                        style={tw`border border-gray-300 p-2 rounded`}
                        value={image}
                        onChangeText={setImage}
                        placeholder="Upload picture" />
                </View>}

            <TouchableOpacity
                style={tw`bg-blue-500 rounded items-center p-4`}
                onPress={handleFormSubmit}
            >
                <Text style={tw`text-white`}>Submit</Text>
            </TouchableOpacity>
            <AlertNotificationRoot />
        </View>
    );
};
