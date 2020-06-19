import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap, Loading } from '../../components'
import { colors,useForm, storeData, showError } from '../../utils'
import { Fire } from '../../config';
import { useDispatch } from 'react-redux';


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

    const dispatch = useDispatch();
    const onContinue = ()=>{
        console.log(form)
        //()=> navigation.navigate('UploadFoto')
        dispatch({type: 'SET_LOADING', value: true});
        Fire.auth().createUserWithEmailAndPassword(form.email, form.pass)
        .then((success)=>{
            dispatch({type: 'SET_LOADING', value: false});
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
            dispatch({type: 'SET_LOADING', value: false});
            showError(errorMessage);
        });
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
