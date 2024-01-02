import React, { useState } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/MaterialIcons'
import Home from './Home';
import Video from './Video';
import CarouselComponent from './Slider';
import tw from 'tailwind-react-native-classnames';
import Profile from './EditProfile';
import ShowProfile from './Showprofile';
import Setting from './Setting';
import SelectCategory from './SelectCategory';
export default function Main() {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';

        switch (routeName) {
            case 'Home':
                icon = 'home'; // Valid Ionicons name for the home icon
                break;
            case 'Video':
                icon = 'videocam'; // Valid Ionicons name for the videocam icon
                break;
            case 'Send':
                icon = 'add'; // Valid Ionicons name for the send icon
                break;
            case 'Profile':
                icon = 'account-circle'; // Valid Ionicons name for the profile icon
                break;
            case 'Setting':
                icon = 'settings'
                break;




            // Add cases for other routes/icons as needed
            // default:
            //     icon = 'home'; // Default to home icon for unmatched route names
            //     break;
        }
        return (
            <Ionicons
                name={icon}
                size={30}
                color={routeName === selectedTab ? 'green' : 'white'}
            />
        );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={styles.tabbarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <CurvedBottomBarExpo.Navigator
            screenOptions={{
                headerShown: false, // Hide the header for all screens
            }}
            type="UP"
            style={styles.bottomBar}
            shadowStyle={styles.shawdow}
            height={55}
            circleWidth={50}
            bgColor="blue"
            initialRouteName="Home"
            borderTopLeftRight
            renderCircle={({ selectedTab, navigate }) => (
                <Animated.View style={styles.btnCircleUp}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('Send')}
                    >
                        <Ionicons name={'add'} color="white" size={50} />
                    </TouchableOpacity>
                </Animated.View>
            )}
            tabBar={renderTabBar}
        >
            <CurvedBottomBarExpo.Screen
                name="Home"
                position="LEFT"
                component={Home}
                options={{ headerShown: false }}
            />
            <CurvedBottomBarExpo.Screen
                name="Video"
                position="LEFT"
                component={() => <Video />}
            />
            <CurvedBottomBarExpo.Screen
                name="Send"
                component={() => <SelectCategory />}
                position="CENTER"
            />
            <CurvedBottomBarExpo.Screen
                name="Profile"
                position="RIGHT"
                component={() => <ShowProfile />}
            />
            <CurvedBottomBarExpo.Screen
                name="Setting"
                component={() => <Setting />}
                position="RIGHT"
            />
        </CurvedBottomBarExpo.Navigator>


    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    shawdow: {
        shadowColor: '#DDDDDD',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        bottom: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    screen1: {
        flex: 1,
        backgroundColor: '#BFEFFF',
    },
    screen2: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },
});
