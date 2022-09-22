/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import Peer from 'react-native-peerjs';
// const peer = new Peer({
//     host: '192.168.100.34',
//     port: 9181,
//     path: '/peer-server',
//     debug: true
// });

AppRegistry.registerComponent(appName, () => App);
