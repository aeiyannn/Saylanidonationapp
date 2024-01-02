import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import CarouselComponent from './Slider';


export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Posts')
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setData(items);
                console.log(items);
            });

        // Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, [])

    const handleLike = () => {
        // Handle like action for itemId
    };

    const handleComment = () => {
        // Handle comment action for itemId
    };

    const handleShare = () => {
        // Handle share action for itemId
    };

    return (

        <View style={tw`flex-1 bg-white`}>

            <FlatList

                data={data}
                ListHeaderComponent={() => (
                    <>
                        <View style={tw`absolute  top-0 left-0 right-0 h-52 bg-blue-700 rounded-b-full`} />
                        <View style={tw`flex-row justify-between mx-5 `}>
                            <View style={tw` flex-row  justify-between mt-3 bg-white rounded-full w-12 h-12 `}>
                                <Image source={{ uri: 'https://res.cloudinary.com/saylani-welfare/image/upload/v1678944812/website-images/static/116.png' }} style={tw`h-12 w-12 rounded-full`} />
                            </View>
                            <View style={tw` flex-row  justify-between items-center bg-white rounded-full mt-4 p-1 w-4/5 shadow-md`}>
                                <TextInput
                                    placeholder="Search"
                                    placeholderTextColor="#A0AEC0"
                                />
                                <Icon style={tw`text-gray-200 mr-6 text-xl`} name='search' />
                            </View>

                        </View>

                        <View style={tw`h-48  m-2`}>
                            <CarouselComponent />
                        </View>
                        <View style={tw`bg-green-100 p-4 flex-row justify-between`}>
                            <Text style={tw`text-blue-500 font-bold `}>Help Us to make Life Better</Text>
                            <TouchableOpacity style={tw`bg-blue-700 p-2 w-28 rounded-lg `}>
                                <Text style={tw`text-white font-bold text-sm text-center`}>Quick Donate</Text>
                            </TouchableOpacity>
                        </View>

                    </>
                )}
                renderItem={({ item }) => (

                    <View style={tw`max-w-sm p-6 bg-white border-2 border-gray-200 rounded-lg shadow my-2`}>
                        <View style={tw`flex-row items-center mb-2`}>
                            <Image style={tw`w-8 h-8 rounded-full`} source={{ uri: 'https://image.winudf.com/v2/image/Y29tLmFwcC5zYXlsYW5pX2ljb25fMF84YzYwYzE2OQ/icon.png?w=184&fakeurl=1' }} />
                            <Text style={tw`ml-2 text-lg font-bold tracking-tight text-gray-900`}>Saylani welfare</Text>
                        </View>

                        <Text style={tw`font-normal text-gray-700 mb-2`}>{item.description}</Text>
                        <View style={tw`border border-gray-100 rounded-lg shadow`}>
                            <Image style={tw`w-full h-52`} source={{ uri: item.img }} />
                        </View>
                        <View style={tw`flex-row justify-between mt-3`}>
                            <TouchableOpacity onPress={() => handleLike(item.id)} style={tw`flex-row items-center`}>
                                <Icon name="heart-o" size={20} color="gray" />
                                <Text style={tw`ml-1 text-gray-700`}>Like</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleComment(item.id)} style={tw`flex-row items-center`}>
                                <Icon name="comment-o" size={20} color="gray" />
                                <Text style={tw`ml-1 text-gray-700`}>Comment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleShare(item.id)} style={tw`flex-row items-center`}>
                                <Icon name="share-square-o" size={20} color="gray" />
                                <Text style={tw`ml-1 text-gray-700`}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
