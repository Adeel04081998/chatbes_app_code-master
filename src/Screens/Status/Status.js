//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../Components/HeaderComponent';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constatns/lang';
import fontFamily from '../../styles/fontFamily';
import { textScale } from '../../styles/responsiveSize';

// create a component
const Status = () => {
    const userData = useSelector(state => state.auth)
    const userName = userData?.userData?.name ?? ''
    const leftCustomView = () => {
        return <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ height: 20 }} />
            <Text style={{
                fontSize: textScale(26),
                fontFamily: fontFamily.bold,
                color: 'black',
            }}>{strings.STATUS}</Text>
        </TouchableOpacity>
    }
    return (
        <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
            <HeaderComponent
                rightPressActive={false}
                centerText={userName}
                containerStyle={{ paddingHorizontal: 8 }}
                leftCustomView={leftCustomView}
                isLeftView={true}
                rightImg={''}
            />
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Status;
