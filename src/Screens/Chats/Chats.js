//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Dimensions, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../Components/HeaderComponent';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constatns/imagePath';
import strings from '../../constatns/lang';
import navigationStrings from '../../constatns/navigationStrings';
import colors from '../../styles/colors';
import { moderateScaleVertical, } from '../../styles/responsiveSize';
import socketServcies from '../../utils/socketService';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { sharedUniqueKeyGenerator } from '../../utils/sharedActions';

// create a component
const Chats = ({ navigation, route }) => {

    const [state, setState] = useState({
        typedMessage: '',
        serverMessages: []
    })
    const userData = useSelector(state => state.auth)
    const userName = userData?.userData?.name ?? ''
    const loginUserId = userData?.userData?._id ?? ''

    const leftCustomView = () => {
        return <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center' }}>
            <View style={{ height: 20 }} />
            <Text style={styles.headingSyle}>{strings.CHATS}</Text>
        </TouchableOpacity>
    }
    const onPressRight = () => {
        navigation.navigate(navigationStrings.USERS)
    }
    const onSendMessage = () => {
        if (state.typedMessage !== '') {
            socketServcies.emit("send_message", {
                "message": state.typedMessage,
                "id": loginUserId
            })
            setState((pre) => ({ ...pre, typedMessage: '' }))
        }
        else { Alert.alert("Warr yara") }
    }

    const RenderMessage = (props) => {
        return (
            <View style={[styles.textUiContainerStyl, props.textUiContainerStyl]}>
                <Text style={[styles.tittleTextStyl, props.tittleTextStyl]} >{props.text}</Text>
            </View>
        )
    }
    // const renderItem = useCallback(({ item, index }) => {
    //     console.log("renderItem=>[]", item);
    //     return (

    //     )
    // }, [data])

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
    }, [state.serverMessages])
    const renderFooter = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TextInput
                    value={state.typedMessage}
                    onChangeText={(text) => { setState((pre) => ({ ...pre, typedMessage: text })) }}
                    placeholder='Type a message'
                    placeholderTextColor={'black'}
                    style={{ color: 'black', paddingVertical: 15, width: Dimensions.get('window').width, backgroundColor: '#FFFFFF', borderWidth: 0.5, borderRadius: 15, }}
                />
                {state.typedMessage && <MaterialIcons
                    name='send'
                    color={"#941ECF"}
                    size={30}
                    style={{ position: 'absolute', right: 10, alignSelf: 'center' }}
                    onPress={onSendMessage}
                />
                }
            </View>
        )

    }
    useEffect(() => {
        socketServcies?.on('received_message', (msg) => {
            console.log("received_message listner=[]", msg);
            setState((pre) => ({ ...pre, serverMessages: [...pre.serverMessages, msg] }))
        })
    })

    console.log("state=[]", state);
    return (
        <WrapperContainer containerStyle={{ paddingHorizontal: 0 }}>
            <HeaderComponent
                rightPressActive={false}
                centerText={userName}
                containerStyle={{ paddingHorizontal: 8 }}
                leftCustomView={leftCustomView}
                isLeftView={true}
                rightImg={''}
                onPressRight={onPressRight}
            />
            <FlatList
                keyboardDismissMode='none'
                keyboardShouldPersistTaps="always"
                data={state.serverMessages}
                renderItem={({ item, index }) => {
                    const alignItemStyl = item._id !== loginUserId ? "flex-start" : "flex-end";
                    const backgroundColorStyl = item._id !== loginUserId ? '#EBEBEB' : '#E0D5FE';
                    return (
                        <RenderMessage
                            text={item.message}
                            key={sharedUniqueKeyGenerator(index)}
                            textUiContainerStyl={{ alignItems: alignItemStyl }}
                            tittleTextStyl={{ backgroundColor: backgroundColorStyl }}
                        />
                    )
                }}
                ListEmptyComponent={listEmptyComponent}
                contentContainerStyle={{ flexGrow: 1, }}
                ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}
                ListFooterComponent={renderFooter()}
            /> 
        </WrapperContainer>
    );
};

export default Chats;
