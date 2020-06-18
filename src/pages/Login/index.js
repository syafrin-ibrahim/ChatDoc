import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Logo } from '../../assets'
import { Input, Link, Gap, Button, Loading } from '../../components'
import { colors, fonts, useForm, storeData } from '../../utils'
import {Fire} from '../../config';
import { showMessage } from 'react-native-flash-message'
import { ScrollView } from 'react-native-gesture-handler'

const Login = ({navigation}) => {
    const [ form, setForm] = useForm({
        email: '',
        pass: ''
    })
    const [ loading, setLoading ] = useState(false);

    const Login = ()=>{
        console.log('form : ', form);
        setLoading(true);
        Fire.auth().signInWithEmailAndPassword(form.email, form.pass)
        .then(res => {
             console.log('success', res);
             setLoading(false);
             Fire.database().ref(`users/${res.user.uid}/`).once('value')
             .then(data => {
                 console.log('user', data.val());
                 if(data.val()){
                     storeData('user', data.val())
                     navigation.replace('MainApp')
                 }
             })
        }).catch(err => {
             console.log('error', err);
             setLoading(false);
             showMessage({
                 message: err.message,
                 type: 'default',
                 backgroundColor: colors.error,
                 color: colors.text
             })
        }) 
       
    }
    return (
        <>
        <View style={ styles.page }>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap heigh={40} />
            <Logo />
            <Text style={styles.title}>Masuk Dan Mulai Berkontribusi</Text>
            <Input label="Email Address" value={form.email} onChangeText={(value)=>setForm('email', value)}/>
            <Gap height={24} />
            <Input label="Password" value={form.pass} onChangeText={(value)=>setForm('pass', value)} secureTextEntry/>
            <Gap height={10} />
            <Link title="Forgot My Password" size={12} />
            <Gap height={40} />
            <Button title="Sign In" onPress={Login}/>
            <Gap height={30} />
            <Link title="Create New Account" size={16} align="center" onPress={()=> navigation.navigate('Register')}/>
            </ScrollView>            
        </View>
        {loading && <Loading /> }
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    page : {
        paddingHorizontal: 40,
        backgroundColor: colors.white,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 40,
        marginBottom: 40,
        maxWidth: 153
    }
})
