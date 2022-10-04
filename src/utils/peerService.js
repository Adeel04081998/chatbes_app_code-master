import Peer from 'react-native-peerjs';

import io from 'socket.io-client';
import navigationStrings from '../constatns/navigationStrings';
import socketServcies from './socketService';

const SOCKET_URL = "http://192.168.100.34:8191/"

class PeerSolutions {
    constructor() {
        this.peerId = ''
        this.userId = ''

    }
    initializePeer = async (data, cb) => {
        // const userId = data?._id ?? ''
        this.userId = data?._id ?? ''
        try {
            this.peer = new Peer(undefined, {
                host: '192.168.100.34',
                secure: false,
                port: 9181,
                path: '/peer-server',
                debug: true
            });
            this.peer.on('open', (peerId,) => {
                console.log('My peer ID is: ', peerId);
                this.peerId = peerId;
                socketServcies.emit('peer-user', {
                    userId: this.userId,
                    socketId: socketServcies.getSocketId(),
                    peerId: peerId
                })
                cb && cb()


            });
            this.peer.on('error', (err) => { console.log('An error accured in peer connection', err) })

        } catch (error) {
            console.log("peer  is not inialized", error)
        }
    }

    getPeerId() {
        return this.peerId
    }

    PeerEmit(event, data = {}) {
        this.peer.emit(event, data)
    }

    Peeron(event, cb) {
        this.peer.on(event, cb)
    }
    // emitEventWithAllData(event, peerId = this.peerId) {
    //     socketServcies.emit(event, {
    //         userId: this.userId,
    //         socketId: socketServcies.getSocketId(),
    //         peerId: peerId
    //     })

    // }


}

const PeerServices = new PeerSolutions()

export default PeerServices