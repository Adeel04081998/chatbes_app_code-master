//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { saveUserData } from '../../reudx/reducers/auth';
import store from '../../reudx/store';

// create a component
const Settings = () => {
    return (
        <View style={styles.container}>
            {/* <Text>Settings</Text> */}
            <TouchableOpacity style={{ height: 50, width: '50%', backgroundColor: 'red', margin: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, }}
                onPress={async () => {
                    let userData = await getItem('userData')
                    await clearAllItem()
                    store.dispatch(saveUserData(''))
                }}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Settings;
