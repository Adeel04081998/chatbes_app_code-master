import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import navigationStrings from '../constatns/navigationStrings';
import * as Screens from '../Screens';
import { Image } from 'react-native';
import imagePath from '../constatns/imagePath';


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName={navigationStrings.CHATS}>
            <Tab.Screen
                name={navigationStrings.STATUS}
                component={Screens.Status}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ tintColor: focused ? 'blue' : 'black' }} source={imagePath.icStatus} />
                    }
                }}
            />
            <Tab.Screen
                name={navigationStrings.CALLS}
                component={Screens.Calls}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ tintColor: focused ? 'blue' : 'black' }} source={imagePath.icCalls} />
                    }
                }}
            />
            <Tab.Screen
                name={navigationStrings.STREAMING}
                // component={Screens.Camera}
                component={Screens.Caller}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ tintColor: focused ? 'blue' : 'black', height: 20, width: 25 }} source={imagePath.icVideo} />
                    }
                }}
            />
            <Tab.Screen
                name={navigationStrings.CHATS}
                component={Screens.Chats}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ tintColor: focused ? 'blue' : 'black' }} source={imagePath.icChats} />
                    }
                }}
            />
            <Tab.Screen
                name={navigationStrings.SETTINGS}
                component={Screens.Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ tintColor: focused ? 'blue' : 'black' }} source={imagePath.icSettings} />
                    }
                }}
            />
        </Tab.Navigator>

    );
}