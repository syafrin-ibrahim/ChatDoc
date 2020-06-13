import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors, fonts } from '../../../utils';
import { onChange } from 'react-native-reanimated';

const Input = ({label, value, onChangeText, secureTextEntry}) => {
    const [border, setBorder] = useState(colors.border);
    const onFocusForm = ()=>{
        setBorder(colors.tertiary)
    }

    const onBlurForm = ()=> {
        setBorder(colors.border)
    }
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput onFocus={onFocusForm} 
            onBlur={onBlurForm} value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry} style={ styles.input(border)}/>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    input : (border)=>({
        borderRadius: 10, 
        borderWidth: 1,
        borderColor: border,
        padding: 12
    }),
    label: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: 6,
        fontFamily: fonts.primary[400]
    }
})
