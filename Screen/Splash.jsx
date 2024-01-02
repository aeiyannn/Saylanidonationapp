import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from "tailwind-react-native-classnames";
import { View, Text, Image } from 'react-native';

function Splash({ navigation }) {

    useEffect(() => {





        setTimeout(async () => {
            let data = await AsyncStorage.getItem("UserActive")
            console.log(data)
            if (data == "true") {

                navigation.replace("main")

            }
            else {
                await AsyncStorage.setItem("user", "true")
                navigation.replace("login")
            }



        }, 1000)
    }, [])
    return (
        <View style={tw`flex-1 justify-center items-center`} >
            <Image style={tw`h-40 w-40`} source={{ uri: 'https://image.winudf.com/v2/image/Y29tLmFwcC5zYXlsYW5pX2ljb25fMF84YzYwYzE2OQ/icon.png?w=184&fakeurl=1' }} />
            {/* <Image style={tw`h-40 w-40`} source={{ uri: 'https://compote.slate.com/images/697b023b-64a5-49a0-8059-27b963453fb1.gif' }} */}
            {/* /> */}
        </View>
    )
}
export default Splash