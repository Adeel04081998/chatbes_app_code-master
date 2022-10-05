import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
import { moderateScale, moderateScaleVertical, textScale } from "../../styles/responsiveSize";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    listEmptyStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(16),

    },
    commStyle: {
        fontSize: textScale(22),
        fontFamily: fontFamily.regular,
    },
    headingSyle: {
        fontSize: textScale(26),
        fontFamily: fontFamily.bold,
        color: 'black',
    },
    textUiContainerStyl: {
        minHeight: 40, top: 10, alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: 10, paddingVertical: 5,
        marginBottom: 20
    },
    tittleTextStyl: {
        backgroundColor: '#E0D5FE', minWidth: 100, minHeight: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,

        textAlign: 'center', textAlignVertical: 'center', color: 'black',
    }

})

export default styles