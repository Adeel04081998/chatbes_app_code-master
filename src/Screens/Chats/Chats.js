//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../Components/HeaderComponent';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constatns/imagePath';
import strings from '../../constatns/lang';
import navigationStrings from '../../constatns/navigationStrings';
import colors from '../../styles/colors';
import {  moderateScaleVertical,  } from '../../styles/responsiveSize';
import styles from './styles';




// create a component
const Chats = ({ navigation, route }) => {

    const [data, setData] = useState([])
    const userData = useSelector(state => state.auth)
    const userName = userData?.userData?.name ?? ''
    const isRejectCallCase = route?.params?.isCallEndFlow ?? '';

    const leftCustomView = () => {
        return <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center' }}>
            {data.length > 0 ? <Text>Edit</Text> : <View style={{ height: 20 }} />}
            <Text style={styles.headingSyle}>{strings.CHATS}</Text>
        </TouchableOpacity>
    }
    const onPressRight = () => {
        navigation.navigate(navigationStrings.USERS)
    }

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View>
                <Text>Flat item</Text>
            </View>
        )
    }, [data])

    const listEmptyComponent = useCallback(() => {
        return (
            <View style={styles.listEmptyStyle}>
                <View style={{}}>
                    <Text style={styles.commStyle}>
                        {strings.TAP_ON} <Image source={imagePath.icEdit} /> <Text style={styles.commStyle}>{strings.IN_THE_TOP_RIGHT_}</Text>
                    </Text>
                </View>
                <Text style={{ ...styles.commStyle, color: colors.grey, marginTop: moderateScaleVertical(16) }}>{strings.YOU_CAN_CHAT_WITH_CONTACTS}</Text>
            </View>
        )
    }, [data])




    return (
        <WrapperContainer
            containerStyle={{ paddingHorizontal: 0 }}
        >
            <HeaderComponent
                rightPressActive={false}
                centerText={userName}
                containerStyle={{ paddingHorizontal: 8 }}
                leftCustomView={leftCustomView}
                isLeftView={true}
                rightImg={imagePath.icEdit}
                onPressRight={onPressRight}
            />
           
            <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={listEmptyComponent}
                contentContainerStyle={{ flexGrow: 1 }}

            />



        </WrapperContainer>
    );
};

export default Chats;
