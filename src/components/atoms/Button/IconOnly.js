import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconBack } from '../../../assets'

const IconOnly = ({onPress, icon}) => {
    const Icon = ()=>{
        if(icon === 'back-dark'){
            return( 
            <IconBack />
            )
        }
        if(icon === 'back-light'){
            return(
                <IconBack />
            )
        }

        return (
            <IconBack />
        )
    }
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Icon />
            </TouchableOpacity>
        </View>
    )
}

export default IconOnly;

