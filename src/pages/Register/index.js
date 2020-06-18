import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap, Loading } from '../../components'
import { colors,useForm, storeData } from '../../utils'
import { Fire } from '../../config';
import { showMessage, hideMessage } from 'react-native-flash-message';


const Register = ({navigation}) => {
    // const [name, setName] = useState('');
    // const [prof, setProf] = useState('');
    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');

    const [form, setForm] = useForm({
        name: '',
        prof: '',
        email: '',
        pass: ''
    })

    const [loading, setLoading] = useState(false);

    const onContinue = ()=>{
        console.log(form)
        //()=> navigation.navigate('UploadFoto')
        
        setLoading(true);
        Fire.auth().createUserWithEmailAndPassword(form.email, form.pass)
        .then((success)=>{
            setLoading(false);
            setForm('reset');
            const data = {
                fullName: form.name,
                profession: form.prof,
                email: form.email,
                uid: success.user.uid
            }
            Fire.database()
            .ref('users/' + success.user.uid + '/')
            .set(data)
            storeData('user', data);
            navigation.navigate('UploadFoto', data);
            console.log('success registrasi', success);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setLoading(false);
            showMessage({
                message: errorMessage,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white
            })
        });
    }
    return (
        <>
        <View style={styles.page}>
            <Header onPress={ ()=> navigation.goBack() } title="Daftar Akun" />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input label="Full Name" value={form.name} onChangeText={(value)=>setForm('name',value)}/>
                    <Gap height={24} />
                    <Input label="Pekerjaan" value={form.prof} onChangeText={(value)=>setForm('prof', value)}/>
                    <Gap height={24} />
                    <Input label="Email" value={form.email} onChangeText={(value)=>setForm('email', value)}/>
                    <Gap height={24} />
                    <Input label="Password" value={form.pass} onChangeText={(value)=>setForm('pass',value)} secureTextEntry/>
                    <Gap height={40} />
                    <Button title="Continue" onPress={onContinue}/>
                </ScrollView>
            </View>
        </View>
        { loading &&   <Loading /> }
      
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    content : {
                padding: 40,
                paddingTop: 0
             }
})
