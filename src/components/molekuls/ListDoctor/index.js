import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, fonts } from '../../../utils'
import { IcNext } from '../../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ListDoctor = ({profile, name, desc, type, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={profile} style={styles.avatar} />
            <View style={styles.wrapper}>

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
            </View>
            {
                type === 'next' &&   <IcNext />
            }
          
        </TouchableOpacity>
    )
}

export default ListDoctor

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    wrapper: {
        flex: 1
    },
    avatar: {
        height: 46,
        width: 46,
        borderRadius: 46/2,
        marginRight: 12
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary
    },
    desc: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary
    }

})
