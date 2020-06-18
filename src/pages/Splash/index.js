import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Logo } from '../../assets'
import { colors, fonts } from '../../utils'
import { Fire } from '../../config';
const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(()=>{
            Fire.auth().onAuthStateChanged((user)=>{
                if(user){
                    navigation.replace('MainApp');
                }else{
                    navigation.replace('GetStarted');
                }
            })
            
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
            backgroundColor: colors.white,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    title : { 
            fontSize: 20,
            fontFamily: fonts.primary[600],
            color: colors.text.primary,
            marginTop: 20
         } 

    
})
