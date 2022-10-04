//import liraries
import React, { } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, } from 'react-native';
import { RTCView } from 'react-native-webrtc'
import { ImagesData } from '../../config/ImagesData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketServcies from '../../utils/socketService';
const { width, height } = Dimensions.get('screen');
const REMOTE_HEIGHT = height * .7;
const Top = REMOTE_HEIGHT * 0.2;

const Streaming = (props) => {
    // console.log("__[Camera]__ PROPS ", props);
    if (!props.localStreaming) return;

    //  state & const & ref  section START from here
    const localStream = props?.localStreaming ?? null;
    const remoteStream = props?.remoteStreaming ?? null;
    const isVideoCallingMode = props?.isVideoCallingMode ?? null
    const SenderSocketId = props?.SenderSocketId ?? null
    //  state & const & ref  section END  here

    //  Component Scope  section START from here
    const Local = () => {
        return <View style={styles.localVideos}>
            <RTCView
                streamURL={localStream ? localStream?.toURL() : ''}
                style={styles.localVideo}
                objectFit={'cover'}
            />
        </View>
    }
    const Remote = () => {
        return <View style={[styles.videos, styles.remoteVideos,]}>
            <RTCView
                streamURL={remoteStream ? remoteStream?.toURL() : ''}
                style={styles.remoteVideo}
                objectFit={'cover'}
            />
            <MaterialIcons
                name='phone-disabled'
                color={'red'}
                size={40}
                onPress={props.onCloseCallHandler}
                style={{ position: 'absolute', bottom: 10, justifyContent: 'center', alignSelf: 'center' }}
            />
        </View>
    }
    const RenderUserImage = ({ path = null, mianContainerStyl = {}, imageStyl = {} }) => {
        return <View style={[mianContainerStyl]}>
            <Image source={path} style={[imageStyl]} />
            <MaterialIcons
                name='phone-disabled'
                color={'red'}
                size={40}
                onPress={props.onCloseCallHandler}
                style={{ position: 'absolute', bottom: 10, justifyContent: 'center', alignSelf: 'center' }}
            />
        </View>
    }
    //  Component Scope  section END here
    // console.log("!remoteStream || !isVideoCallingMode ", isVideoCallingMode);
    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Text>SenderSocketId ={SenderSocketId}</Text>
                {localStream || isVideoCallingMode ? <Local /> : <RenderUserImage path={ImagesData.localUserPic} mianContainerStyl={styles.localVideos} imageStyl={styles.localVideo} />}
                {remoteStream || isVideoCallingMode ? <Remote /> : <RenderUserImage path={ImagesData.remoteUserPic} mianContainerStyl={styles.userPicContainer} imageStyl={styles.remoteVideo} />}

                {/* {!localStream || !isVideoCallingMode ? <RenderUserImage path={ImagesData.localUserPic} mianContainerStyl={styles.localVideos} imageStyl={styles.localVideo} /> : <Local />}
                {!remoteStream || !isVideoCallingMode ? <RenderUserImage path={ImagesData.remoteUserPic} mianContainerStyl={styles.userPicContainer} imageStyl={styles.remoteVideo} /> : <Remote />} */}
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
        // height: 100,
        // marginBottom: 10,
        height: 150,
        width: 150,
        top: 0,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        borderRadius: 75,
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
    userPicContainer: {
        width: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 6,
        height: 400,

    }

});

//make this component available to the app
export default Streaming;
