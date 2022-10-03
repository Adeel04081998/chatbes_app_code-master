/**
 * @format
 */
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/reudx/store';


// Text.defaultProps.style = { color: 'white' }


const RNRedux = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    )

}


AppRegistry.registerComponent(appName, () => RNRedux);
