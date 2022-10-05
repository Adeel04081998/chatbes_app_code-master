//import liraries
import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../Components/HeaderComponent';
import HorizontalLine from '../../Components/HorizontalLine';
import RoundImage from '../../Components/RoundImage';
import WrapperContainer from '../../Components/WrapperContainer';
import { iconsData } from '../../constatns/iconsData';
import imagePath from '../../constatns/imagePath';
import strings from '../../constatns/lang';
import navigationStrings from '../../constatns/navigationStrings';
import actions from '../../reudx/actions';
import colors from '../../styles/colors';
import { sharedUniqueKeyGenerator } from '../../utils/sharedActions';
import socketServcies from '../../utils/socketService';
import styles from './styles';


var senderObj = {}
const Users = ({ navigation }) => {
    let userDataRedux = useSelector(state => state.auth)

    const [state, setState] = useState({ usersList: [] })
    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const res = await actions.fetchUsers()
            if (!!res?.data) {
                setState((pre) => ({ ...pre, usersList: res.data.users }))
            }
        } catch (error) {
            console.log("error raised during fetch user", error)
        }
    }
    const onPressRight = () => { navigation.goBack() }
    const onPressCallingMode = useCallback(({ x, item }) => {
        var callerObj = state.usersList.find((element) => { return element._id === userDataRedux.userData._id; });
        socketServcies.emit('call_config', { callingMode: x, })
        socketServcies.emit('sender_caller', { caller: callerObj, receiver: item })
        navigation.navigate(x.navigationPath, { item: item, callingMode: x.CallingMode, })
    }, [])

    const renderItem = useCallback(({ item, index }) => {
        if (item?._id !== userDataRedux.userData._id) {
            return (
                <TouchableOpacity onPress={() => onPressItem(item)} activeOpacity={0.7} style={[styles.headerStyle, { justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }]}>
                    <RoundImage
                        image={item?.profileImage}
                        size={40}
                    />
                    <Text style={styles.userName}>{item?.name}</Text>
                    {/* <Text style={{ fontWeight: 'bold', marginHorizontal: 10, color: 'black' }}>{item?.peerID}</Text> */}
                    {
                        iconsData.map((x, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { onPressCallingMode({ x, item }) }}
                                    key={sharedUniqueKeyGenerator()}>
                                    <Image source={x.icon} style={{ height: 30, width: 30, tintColor: colors.blue }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </TouchableOpacity>
            )
        }

    }, [state.usersList])

    const listEmptyComponent = useCallback(() => {
        return (
            <View style={styles.listEmptyStyle}>
                <Text>No User Found</Text>
            </View>
        )
    }, [state.usersList])

    const listHeaderComponent = useCallback(() => {
        return (
            <View style={styles.headerStyle}>
                <RoundImage
                    image={imagePath.icGroup}
                    isStatic={true}
                    size={40}
                />
                <Text style={styles.newGroupText}>{strings.NEW_GROUP}</Text>

            </View>
        )
    }, [state.usersList])

    return (
        <WrapperContainer
            containerStyle={{ paddingHorizontal: 0 }}
        >
            <HeaderComponent
                rightPressActive={false}
                centerText={strings.NEW_CHAT}
                containerStyle={{ paddingHorizontal: 8 }}
                rightText={strings.CANCEL}
                rightTextStyle={{ color: colors.lightBlue }}
                onPressRight={onPressRight}
            />
            <FlatList
                data={state.usersList}
                renderItem={renderItem}
                ListEmptyComponent={listEmptyComponent}
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={listHeaderComponent}
                ItemSeparatorComponent={() => <HorizontalLine />}

            />

        </WrapperContainer>
    );
};

export default Users;


