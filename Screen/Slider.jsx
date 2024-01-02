import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';

const CarouselComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Slider')
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setData(items);
            });

        // Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Swiper style={styles.wrapper} showsButtons loop autoplay>
                {data.map((item, index) => (
                    <View key={index} style={styles.slide}>
                        <Image style={styles.image} source={{ uri: item.img }} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        borderRadius: 20, // Adjust the value to change the roundness
        overflow: 'hidden', // Ensure contents don't overflow the rounded border
        marginLeft: 38
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});

export default CarouselComponent;
