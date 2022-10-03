//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Routes from './src/Navigations/Routes';
import { saveUserData } from './src/reudx/reducers/auth';
import store from './src/reudx/store';
import socketServcies from './src/utils/socketService';
import { clearAllItem, getItem } from './src/utils/utils';
import { useSelector } from 'react-redux';
import PeerServices from './src/utils/peerService';
import Model from './src/Components/Model';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import navigationStrings from './src/constatns/navigationStrings';
import { hblRequestRef, sharedCallAnswer, sharedDisconnectCall, sharedInitialzeConnections, sharedSetCallStream, _callRef } from './src/utils/sharedActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

AntDesign.loadFont();
Entypo.loadFont();
EvilIcons.loadFont();
Feather.loadFont();
FontAwesome.loadFont();
Fontisto.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
Foundation.loadFont();
SimpleLineIcons.loadFont();

// create a component
const App = ({ navigation }) => {

  const [showModal, setShowModal] = useState(false)
  const [callStream, setCallStream] = useState()
  const [CallMode, setCallMOde] = useState()
  const [hostId, setHostId] = useState()

  const nav = useNavigation()
  let userDataRedux = useSelector(state => state.auth)
 

  useEffect(() => {
    if (Object.keys(userDataRedux?.userData).length) {
      console.log("here in useEffect app .js");
      // initialzeConnections()
      sharedInitialzeConnections()
      socketServcies?.on('call_config', (call_config_Data) => {
        setCallMOde(call_config_Data?.callingMode)
      })
      PeerServices?.Peeron('call', (call) => {
        // sharedSetCallStream(call)
        setHostId(call?.peer)
        setCallStream(call)
        setShowModal(true)
      })
      socketServcies?.on('call_disconnected', (data) => {
        setShowModal(false)
        // initialzeConnections()
        // nav.reset({
        //   index: 0,
        //   routes: [{ name: navigationStrings.CHATS }]
        // })
      })

     

    }

  }, [userDataRedux?.userData])

  useEffect(() => {
    (async () => {
      let userData = await getItem('userData')
      if (!!userData) {
        store.dispatch(saveUserData(userData))
      }
    })();

  }, [])


  return (
    <View style={styles.container}>
      <Routes />
      {showModal ?
        <Model
          onAcceptCall={() => {
            nav.navigate('camera', {
              callStreaming: callStream,
              callingMode: CallMode.CallingMode
            })
            setShowModal(false)

          }}
          onRejectCall={() => {
            sharedDisconnectCall(hostId)
            // nav.reset({
            //   index: 0,
            //   routes: [{ name: navigationStrings.CHATS }]
            // })

          }}
        />
        : <View />
      }
    </View>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
