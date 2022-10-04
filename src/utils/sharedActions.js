// import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import PeerServices from './peerService';
import store from '../reudx/store';
import socketServcies from './socketService';
import { mediaDevices } from 'react-native-webrtc';
import { Alert } from 'react-native';
var call = null
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
// Initiate Connections

export const sharedInitialzeConnections = (endCallCase, cb) => {
    // console.log("end call case", endCallCase);
    const user = store.getState().auth.userData
    PeerServices.initializePeer(user)
    socketServcies.initializeSocket(user)

}

// Initiate local Video Streaming
export const sharedInitLocalCall = (isVideoCall, cb) => {
    mediaDevices.getUserMedia({ video: isVideoCall, audio: true }).then(localStream => {
        cb && cb(localStream)
    }).catch(err => {
        console.log('Failed to get local stream [ERR]', err);
    })
}

