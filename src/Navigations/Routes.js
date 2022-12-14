import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

function Routes() {
  const userData = useSelector(state => state.auth)


  return (

    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     {!!userData?.userData?._id ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>}

    //   </Stack.Navigator>
    // </NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!!userData?.userData?._id ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>}

  </Stack.Navigator>
  );
}

export default Routes;