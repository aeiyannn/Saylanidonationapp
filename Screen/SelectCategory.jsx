import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'

export default function SelectCategory() {
    const navigation = useNavigation()
    return (
        <View style={tw` bg-green-700 h-full`} >
            <View style={tw`m-4`} >
                <TouchableOpacity onPress={() => navigation.navigate('senddonation')} style={tw`max-w-sm  flex-row justify-between py-8 px-4 bg-white border-2 border-gray-200 rounded-lg shadow my-10`}>
                    <Text style={tw`mt-12 text-2xl text-blue-500 font-bold`}>Send Donation</Text>
                    <Image style={tw`h-28 w-28 `} source={require('../image/Donationsend.png')} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('sendhelp')} style={tw`max-w-sm  flex-row justify-between py-8 px-4 bg-white border-2 border-gray-200 rounded-lg shadow my-10`}>
                    <Text style={tw`mt-12 text-2xl text-green-500 font-bold`}>Request Help</Text>
                    <Image style={tw`h-28 w-28 `} source={require('../image/Donationrequest.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
