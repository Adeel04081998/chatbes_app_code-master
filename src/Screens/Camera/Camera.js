//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native';
import { androidCameraPermission } from '../../utils/permissions';
import { mediaDevices, RTCView } from 'react-native-webrtc'
import { sharedInitLocalVideo } from '../../utils/sharedActions';
import Peer from 'react-native-peerjs';



const { width, height } = Dimensions.get('screen');

// const peer = new Peer();

const peer = new Peer(undefined, {
    secure: false,
    host: '192.168.100.34',
    port: 9181,
    path: '/peer-server',
    debug: true
});

console.log('peer conection', peer);

// create a component
const Camera = () => {
    const REMOTE_HEIGHT = height * .7;
    const Top = REMOTE_HEIGHT * 0.2;

    const [localStream, setLocalStream] = useState({ toURL: () => null });
    const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
    const [peerID, setpeerID] = useState('');

    const videoCallData = {
        mandatory: {
            width: 640,
            height: 480,
            minFrameRate: 30,
        },
        facingMode: 'user',
    }

    const call = (partnerId) => {

        mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
            // setLocalStream(localStream);
            const call = peer.call(inputRef.current, localStream);
            // console.log('call..', call);

            // call.on('stream', function (remoteStream) {
            //     console.log('[call.on(stream)]. remoteStream', remoteStream);
            //     setRemoteStream(remoteStream)
            // })  
        }).catch(err => {
            console.log('Failed to get local stream', err);
        })
    }




    useEffect(() => {
        // initLocalVideo()
        //  Local Peer ID

        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            setpeerID(id)

        });


        // peer.on('connection', function (dataConnection) {
        //     console.log('My peer Data Connection: ' + dataConnection);
        //     dataConnection.on('data', function (data) {
        //         // Will print 'hi! Greeting from ${parnterPeerId}'
        //         console.log('Data from peer connection ->', data);
        //     });
        // });
        peer.on('call',  (call) =>{
            console.log('[peer.on.call] Ran...', );
            mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
                console.log('[peer.on.call]', localStream);
                // setLocalStream(localStream);
                // call.answer(localStream);
                // call.on('stream', function (remoteStream) {
                //     // console.log('[peer.on.call].stream', remoteStream, JSON.stringify(remoteStream));
                //     setRemoteStream(remoteStream)
                // })
            }).catch(err => {
                console.log('Failed to get local stream', err);
            })
        });
        // peer.on('close', function () {
        //     console.log('My peer connection closed');
        // });
        // peer.on('disconnected', function () {
        //     console.log('My peer disconnected');
        // });
        peer.on('error', function (err) { console.log('An error accured in peer connection', err) })
    }, []);

    console.log("localStream=>>", localStream.toURL());
    console.log("remoteStream=>>", remoteStream.toURL());
    const inputRef = React.useRef();
    return (
        <View style={styles.container}>
            <TextInput placeholder='partnerID' placeholderTextColor={"black"}
                // value={peerID}
                ref={inputRef}
                onChangeText={value => inputRef.current = `${value}`}

                style={{ color: "#000" }}
            />
            <Button onPress={call} title="call" />
            <Text style={{ color: 'black' }}>{peerID}</Text>
            <View style={styles.videoContainer}>
                <View style={{ height: 150, width: 150, top: 10, position: 'relative', overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end', borderRadius: 75, }}>
                    {/* <Text>Your Video</Text> */}
                    <RTCView
                        streamURL={localStream ? localStream.toURL() : ''}
                        style={styles.localVideo}
                        objectFit={'cover'}
                    />
                </View>
                <View style={[styles.videos, styles.remoteVideos,]}>
                    <RTCView
                        streamURL={remoteStream ? remoteStream.toURL() : ''}
                        style={styles.remoteVideo}
                        objectFit={'cover'}
                    />
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },

    videoContainer: {
        flex: 1,
        minHeight: 450,
    },
    videos: {
        width: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',

        borderRadius: 6,
    },
    localVideos: {
        height: 100,
        marginBottom: 10,
    },
    remoteVideos: {
        height: 400,
    },
    localVideo: {
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',

    },
    remoteVideo: {
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
    },

});

//make this component available to the app
export default Camera;
