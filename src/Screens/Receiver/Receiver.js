//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import navigationStrings from '../../constatns/navigationStrings';
import { sharedInitLocalCall } from '../../utils/sharedActions';
import Streaming from '../Streaming/Streaming';

const { width, height } = Dimensions.get('screen');

const Receiver = ({ navigation, route }) => {
    //  state & const & ref  section START from here
    const ReceiverCallStream = route?.params?.callStreaming ?? ''
    const isVideoCallingMode = route?.params?.callingMode === 1 ? true : false
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    //  state & const & ref  section END  here

    //  Component Scope Function section START from here
    const endCallHandler = () => {
        if (ReceiverCallStream.close) {
            ReceiverCallStream.close();
            setLocalStream(null);
            setRemoteStream(null);
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: navigationStrings.CHATS }]
            // })
            navigation.navigate(navigationStrings.CHATS, {})
        }
    }
    //  Component Scope Function section END here

    //  UseEffect section START from here
    useEffect(() => {
        sharedInitLocalCall(isVideoCallingMode, (stream) => {
            setLocalStream(stream)
            ReceiverCallStream.answer(stream);
            ReceiverCallStream.on('stream', (remoteStream) => {
                //  Receiver side event fire to get remote stream
                setRemoteStream(remoteStream)
            })
            ReceiverCallStream.on('close', () => { endCallHandler() })
        })
    }, []);
    //  UseEffect section END  here

    return (
        <Streaming
            localStreaming={localStream}
            remoteStreaming={remoteStream}
            onCloseCallHandler={() => { endCallHandler() }}
            isVideoCallingMode={isVideoCallingMode}
        />
    );
};

//make this component available to the app
export default Receiver;
