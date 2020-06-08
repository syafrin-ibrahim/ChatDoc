import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Logo } from '../../assets'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(()=>{
            navigation.replace('GetStarted');
        }, 3000)
        
    }, [])
    return (
        <View style={styles.page}>
        <Logo />
        <Text style={styles.title}>Chat Doctor</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    page : {
            backgroundColor: 'yellow',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    title : { 
            fontSize: 20,
            fontWeight: '600',
            color: '#112340',
            marginTop: 20
         } 

    
})
