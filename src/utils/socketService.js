import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_BASE_URL } from '../config/urls';

// const SOCKET_URL = "http://192.168.100.34:8191/"

const SOCKET_URL = "https://cibaksocketio.herokuapp.com/"

class WSService {
    constructor() {
        this.soketId = ''
    }

    initializeSocket = async (data) => {
        const userId = data?._id
        try {
            this.socket = io(SOCKET_BASE_URL, {
                transports: ['websocket'],
                query: 'userId=' + userId
            })

            this.socket.on('connect', (data) => {
                console.log("socket connect");
                this.socket.on('socket-connected', (socketId) => {
                    console.log("socket connected", socketId);
                    this.soketId = socketId
                })
            })


            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ====")
            })

            this.socket.on('error', (data) => {
                console.log("socekt error", data)
            })

        } catch (error) {
            console.log("scoket is not inialized", error)
        }
    }
    getSocketId() {
        return this.soketId
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }

    on(event, cb) {
        this.socket.on(event, cb)
    }

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }


}

const socketServcies = new WSService()

export default socketServcies