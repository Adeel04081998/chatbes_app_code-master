//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc'
import PeerServices from '../../utils/peerService';
import { ImagesData } from '../../config/ImagesData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCallStream, sharedDisconnectCall, sharedInitialzeConnections, sharedInitLocalCall } from '../../utils/sharedActions';
import navigationStrings from '../../constatns/navigationStrings';
import socketServcies from '../../utils/socketService';
import { CommonActions, StackActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

// create a component
const Sender = ({ navigation, route }) => {

    const USER = route?.params?.item?.name ?? '';
    const REMOTE_HEIGHT = height * .7;
    const Top = REMOTE_HEIGHT * 0.2;
    const hostId = route?.params?.item?.peerID ?? ''
    const [localStream, setLocalStream] = useState({ toURL: () => null });
    const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
    const [name, setName] = useState(hostId)
    const callObj = React.useRef(null)

    const callStream = route?.params?.callStreaming ?? '';
    const isVideoCallingMode = route?.params?.callingMode === 1 ? true : false
    console.log('navigation', navigation);

    const closeCall = () => {
        console.log('callObj.current', callObj.current);
        if (callStream.close) {
            callStream.close();
        } else if (callObj.current) {
            callObj.current.close()
        }
        setLocalStream(null);
        setRemoteStream(null);
        // navigation.navigate(navigationStrings.CHATS);
        navigation.reset({
            index: 0,
            routes: [{ name: navigationStrings.CHATS }]
        })

    }
    const startCall = () => {
        console.log(`[${USER}].startCall ran...`);
        mediaDevices.getUserMedia({ video: isVideoCallingMode, audio: true }).then(localStream => {
            setLocalStream(localStream);
            // console.log(`[${USER}]. name`, name);
            const call = PeerServices.peer.call(name, localStream);
            // console.log(`[${USER}]. call`, call);
            callObj.current = call;
            call.on('stream', function (remoteStream) {
                setRemoteStream(remoteStream)
            });
            call.on('close', () => {
                closeCall();
            })
        }).catch(err => {
            console.log('Failed to get local stream', err);
        })
    }

    useEffect(() => {
        // startCall()
        // if (callStream) {

        //     mediaDevices.getUserMedia({ video: isVideoCallingMode, audio: true }).then(localStream => {
        //         setLocalStream(localStream);
        //         callStream.answer(localStream);
        //         callStream.on('stream', function (remoteStream) {
        //             setRemoteStream(remoteStream)
        //         })
        //         callStream.on('close', () => {
        //             // setLocalStream(null)
        //             // setRemoteStream(null)
        //             // Alert.alert("hy stream")
        //             closeCall()

        //         })

        //     }).catch(err => {
        //         console.log('Failed to get local stream', err);
        //     })

        // }

        sharedInitLocalCall((stream) => {
            console.log("data=>>.", stream);
            setLocalStream(stream)
        })
    }, [route.params]);




    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <View style={{ height: 150, width: 150, top: 0, position: 'relative', overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end', borderRadius: 75, }}>
                    {
                        !localStream?.toURL() || !isVideoCallingMode ?
                            <Image
                                source={ImagesData.localUserPic}
                                style={styles.localVideo}
                            />
                            :
                            <RTCView
                                streamURL={localStream ? localStream.toURL() : ''}
                                style={styles.localVideo}
                                objectFit={'cover'}
                            />
                    }
                </View>
                <View style={[styles.videos, styles.remoteVideos,]}>
                    {
                        !remoteStream?.toURL() || !isVideoCallingMode ?
                            <Image
                                source={ImagesData.remoteUserPic}
                                style={styles.remoteVideo}
                            />
                            :
                            <RTCView
                                streamURL={remoteStream ? remoteStream.toURL() : ''}
                                style={styles.remoteVideo}
                                objectFit={'cover'}
                            />
                    }
                    <MaterialIcons
                        name='phone-disabled'
                        color={'red'}
                        size={40}
                        onPress={() => {
                            // console.log('[onPress].callStream', callStream)
                            closeCall();
                            // sharedDisconnectCall(hostId, navigation)
                            // PeerServices.peer.of(hostId)
                            // // const _call = getCallStream()
                            // console.log("get===>>", getCallStream())
                            // console.log('global.call', global.call)

                        }}
                        style={{ position: 'absolute', bottom: 10, justifyContent: 'center', alignSelf: 'center' }}
                    // onPress={onPress}

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
export default Sender;
