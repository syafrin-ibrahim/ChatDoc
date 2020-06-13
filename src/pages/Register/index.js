import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap } from '../../components'
import { colors,useForm } from '../../utils'

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

    const onContinue = ()=>{
        console.log(form)
        //()=> navigation.navigate('UploadFoto')
    }
    return (
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
