import React from 'react';
import { Alert, } from 'react-native';
import { io } from 'socket.io-client';

import ImagePicker from 'react-native-image-crop-picker';
import { mediaDevices } from 'react-native-webrtc'

// const SOCKET_URL = "http://192.168.100.34:8191/"
// const socket = io(SOCKET_URL)

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
        console.log(res);
        // updateState({ image: res.path })
    });
}
export const sharedInitLocalVideo = async () => {

    try {
        mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: (true ? "user" : "environment"),
                // deviceId: videoSourceId
            }
        })
            .then((stream) => {
                // Got stream!
                console.log("sharedInitLocalVideo=>>> Gotstream", stream);
                return stream
            })
            .catch((error) => {
                // Log error
            });
    } catch (error) {
        console.log("initlocalVideo=>>", error);

    }

};
