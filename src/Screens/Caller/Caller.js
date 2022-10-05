//import liraries
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, ToastAndroid, } from 'react-native';
import navigationStrings from '../../constatns/navigationStrings';
import PeerServices from '../../utils/peerService';
import {  sharedInitLocalCall } from '../../utils/sharedActions';
import socketServcies from '../../utils/socketService';
import Streaming from '../Streaming/Streaming';
// create a component
const Caller = ({ navigation, route }) => {
    //  state & const & ref  section START from here
    const ReceiverId = route?.params?.item?.peerID ?? ''
    const SenderSocketId = route?.params?.senderSocketID ?? ''
    const isVideoCallingMode = route?.params?.callingMode === 1 ? true : false
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const callObj = React.useRef(null)
    //  state & const & ref  section END  here

    //  Component Scope Function section START from here
    const endCallHandler = () => {
        if (callObj.current) {
            callObj.current.close()
            setLocalStream(null);
            setRemoteStream(null);
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: navigationStrings.CHATS }]
            // })
            navigation.navigate(navigationStrings.CHATS, {})
        }
    }
    const initiateCallToReceiver = (localStreaming, remoteStreamCb,) => {
        const call = PeerServices.peer.call(ReceiverId, localStreaming);
        callObj.current = call;
        // Event work when Recever answer the call
        call.on('stream', (remoteStream) => { remoteStreamCb && remoteStreamCb(remoteStream) });
        call.on('close', () => { endCallHandler() })
    }
    //  Component Scope Function section END here

    //  UseEffect section START from here
    useEffect(() => {
        if (ReceiverId) {
            sharedInitLocalCall(isVideoCallingMode, (stream) => {
                setLocalStream(stream)
                initiateCallToReceiver(stream, (remoteStreaming) => { setRemoteStream(remoteStreaming) })
            })
        } else {
            // Alert.alert("Enter Receiver ID First !!")
            navigation.navigate(navigationStrings.USERS, {})
        }

    }, []);
    useEffect(() => {
        socketServcies.on('call_declined', (data) => {
            // navigation.navigate(navigationStrings.USERS, {})        
            navigation.navigate(navigationStrings.CHATS, {})
        })
    })
    //  UseEffect section END  here

    return (
        <Streaming
            localStreaming={localStream}
            remoteStreaming={remoteStream}
            isVideoCallingMode={isVideoCallingMode}
            onCloseCallHandler={() => { endCallHandler() }}
            SenderSocketId={SenderSocketId}
        />
    );
};



//make this component available to the app
export default Caller;
