//import liraries
import React, { Fragment, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Button, Modal } from 'react-native';

const Model = ({ onAcceptCall = () => { }, onRejectCall = () => { } }) => {
    return (
        <View style={{ width: '100%', }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
             
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>SomeOne is Calling You!</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <TouchableOpacity style={{ marginHorizontal: 20, backgroundColor: 'red', width: '40%', paddingVertical: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}

                                onPress={onAcceptCall}

                            >
                                <Text style={{ color: 'black' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 20, backgroundColor: 'green', width: '40%', paddingVertical: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
                                onPress={onRejectCall}
                            >
                                <Text style={{ color: 'black' }}>No</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        // width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black'
    }
});



export default Model
