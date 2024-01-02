import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
export default function Setting() {

    return (
        <View>
            <View style={tw`m-2`}>
                <Image style={tw`h-16 w-5/6 mx-auto`} source={{ uri: 'https://vectorseek.com/wp-content/uploads/2023/08/Saylani-Welfare-International-trust-Logo-Vector.svg-.png' }} />
            </View>
            <View>
                <Image style={tw`h-20 w-20 border-4  border-blue-700 rounded-full mx-auto my-4`} source={{ uri: 'https://res.cloudinary.com/saylani-welfare/image/upload/v1678944812/website-images/static/116.png' }} />
                <Text style={tw`text-center text-lg text-green-500 font-bold`}>Saylani Donation App</Text>
                <Text style={tw`text-center text-lg text-gray-500 font-bold`}>version 2.0</Text>
                <Text style={tw`text-center text-sm text-gray-500 font-mono`}>Developed By Aeiyan Khan</Text>
            </View>
            <View style={tw` flex flex-row justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-4 mt-8`}>
                <Text style={tw`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}>About</Text>
                <Icon name='arrow-right' size={30} />
            </View>
            <View style={tw`flex flex-row justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-4`}>
                <Text style={tw`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}>Term And Condition</Text>
                <Icon name='arrow-right' size={30} />
            </View>
            <View style={tw` flex flex-row justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-4`}>
                <Text style={tw`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}>Privacy Policy</Text>
                <Icon name='arrow-right' size={30} />
            </View>
        </View >
    );
};