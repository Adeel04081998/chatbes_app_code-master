// import React from 'react';
console.log('Shared....');
import ImagePicker from 'react-native-image-crop-picker';
import PeerServices from './peerService';
import { useSelector } from 'react-redux';
import store from '../reudx/store';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constatns/navigationStrings';
import socketServcies from './socketService';
import { mediaDevices } from 'react-native-webrtc';
var call = null


// export const _callRef = React.createRef('')




export const sharedUniqueKeyGenerator = (randomNumber = 1000) => {
    return Math.floor(Math.random() * randomNumber) + new Date().getTime()
}
export const sharedOpenCamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'video'
    }).then(res => {
        // updateState({ image: res.path })
    });
}

export const sharedDisconnectCall = (ids, navigation) => {

    PeerServices.peer.connections[ids].forEach((conn, index, array) => {
        console.log(`closing ${conn.connectionId} peerConnection (${index + 1}/${array.length})`, conn.peerConnection);
        if (conn.close) {
            console.log("log close if=>>>");
            conn.close();
            navigation.navigate(navigationStrings.CHATS, {})

        }
    });



}

export const sharedSetCallStream = (newCall) => {
    console.log("newCall", newCall);
    call = 'newCall'
    global.call = 'newCall'
    console.log("call", call);


}

export const getCallStream = () => {
    console.log('call', call);
    return call
}

export const sharedInitialzeConnections = (endCallCase, cb) => {
    console.log("end call case", endCallCase);
    const user = store.getState().auth.userData
    console.log("user=>", user);
    if (endCallCase === true) {
        console.log("sharedInitialzeConnections if===>");
        PeerServices.initializePeer(user, cb)

    } else {
        console.log("sharedInitialzeConnections else===>");
        PeerServices.initializePeer(user)
        socketServcies.initializeSocket(user)
    }

}
export const sharedInitLocalCall = (cb) => {
    mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
        console.log("sharedInitLocalCall", localStream);
        cb && cb(localStream)
    }).catch(err => {
        console.log('Failed to get local stream', err);
    })


}