import { combineReducers } from "redux";
import auth from './auth';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistUserConfig = {
    key: 'userconfig',
    storage: AsyncStorage,
};
const appReducer = combineReducers({
    // authReducer: persistReducer(persistUserConfig, auth)
    auth
})

export default appReducer
// userReducer: persistReducer(persistUserConfig, Reducers.userReducer),
