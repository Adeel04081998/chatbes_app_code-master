import React from 'react';
import navigationStrings from '../constatns/navigationStrings';
import TabRoutes from './TabRoutes';
import * as Screens from '../Screens';

export default function (Stack) {
    return (
        <>
            <Stack.Screen name={navigationStrings.TAB_ROUTES} component={TabRoutes} />
            <Stack.Screen name={navigationStrings.USERS} component={Screens.Users} />
            <Stack.Screen name={navigationStrings.CALLER} component={Screens.Caller} />
            <Stack.Screen name={navigationStrings.RECEIVER} component={Screens.Receiver} />



        </>
    )
}