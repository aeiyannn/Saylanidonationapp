import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import WebView from 'react-native-webview';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

export default function Video() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsCollection = await firestore().collection('Posts').get();

                const items = itemsCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setData(items);
                console.log(items);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleLike = (itemId) => {
        // Handle like action for itemId
    };

    const handleComment = (itemId) => {
        // Handle comment action for itemId
    };

    const handleShare = (itemId) => {
        // Handle share action for itemId
    };

    return (
        <View style={tw`flex-1 bg-blue-400 mb-12`}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={tw`max-w-sm p-6 bg-white border-2 border-gray-200 rounded-lg shadow my-2`}>
                        <View style={tw`flex-row items-center mb-2`}>
                            <Image style={tw`w-8 h-8 rounded-full`} source={{ uri: 'https://image.winudf.com/v2/image/Y29tLmFwcC5zYXlsYW5pX2ljb25fMF84YzYwYzE2OQ/icon.png?w=184&fakeurl=1' }} />
                            <Text style={tw`ml-2 text-lg font-bold tracking-tight text-gray-900`}>Saylani welfare</Text>
                        </View>

                        <Text style={tw`font-normal text-gray-700 mb-2`}>{item.description}</Text>
                        <View style={tw`border border-gray-100 rounded-lg shadow`}>

                            <View style={{ flex: 1, height: 200 }}>
                                <WebView
                                    style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    source={{ uri: 'https://www.youtube.com/watch?v=SK200UwNM6s' }}
                                />
                            </View>
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
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
            />
        </View>
    );
}
