import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, Profile, Input, Button, Gap } from '../../components';
import { Fire } from '../../config';
import { showMessage } from 'react-native-flash-message';
import { colors, storeData, getData, showError } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import { NullPhoto } from '../../assets';
const UpdateProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName: '',
        prof: '',
        email: ''
    })
    const [pass, setPass] = useState('');
    const [photo, setPhoto] = useState(NullPhoto);
    const [photoDb, setPhotoDb] = useState('');
    useEffect(()=>{
        getData('user').then(res => {
            
            const data = res;
            data.photoDb = res?.photo?.length > 1 ? res.photo : NullPhoto;
            const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : NullPhoto;
            setPhoto(tempPhoto)
            setProfile(data)
        });
    }, [])

    const update = ()=>{
        const data = profile;
        data.photo = photoDb;
        console.log('pass baru', pass);
        if(pass.length > 0 ){
            if(pass.length < 6 ){
               showError('oops password kurang dari 6 character');
            }else{
              updatePass();  
              updateDataProfile();
           
            }
        }else{
            updateDataProfile();
        }
        
    }

    const updateDataProfile = ()=>{
        const data = profile;
        data.photo = photoDb;
        console.log('data siap di upload', data);
        console.log('pass baru', pass);
        Fire.database()
        .ref(`users/${profile.uid}/`)
        .update(data)
        .then(() => {
            storeData('user', data)
            .then(()=>{
                navigation.replace('MainApp');
            }).catch(()=>{
                showError('Terjadi Masalah');
            })
        }).catch(err => {
           showError(err.message);
        })
    }

    const updatePass = ()=>{
        // Fire.auth().onAuthStateChanged((user)=>{
        //     if(user){
        //             user.updatePassword(pass).catch((err)=>{
        //                 showError(err.message);
        //             })
        //     }
        // });
    }

    const changeText = (key, value)=>{
        setProfile({
            ...profile,
            [key]: value
        })
    }

    const getImage = ()=>{
        ImagePicker.launchImageLibrary({quality: 0.5, maxWidth: 200, height: 200}, (response)=>{
            // console.log('response', response);
            if(response.didCancel || response.error){
                showMessage({
                    message: 'ooops..,Sepertinya Anda Tidak Memilih Foto',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                })
            }else{
              
                setPhotoDb(`data:${response.type};base64, ${response.data}`);
                console.log('foto db ', photoDb);              
                const source = { uri: response.uri }
                setPhoto(source);
            

            }
        })
    }
    return (
        <View style={styles.page}>
            <Header title="Update Profile" onPress={()=> navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.content}>
                <Profile isRemove photo={photo} onPress={getImage}/>
                <Gap height={26} />
                <Input label="Full Name"  value={profile.fullName} onChangeText={(value)=>changeText('fullName', value)}/>
                <Gap height={24} />
                <Input label="Pekerjaan"  value={profile.profession} onChangeText={(value)=>changeText('profession', value)}/>
                <Gap height={24} />
                <Input label="Email"  value={profile.email} disable/>
                <Gap height={24} />
                <Input label="Password"  secureTextEntry value={pass} onChangeText={(value)=>setPass(value)}/>
                <Gap height={24} />
                <Button title="Save Profile" onPress={update} />
                <Gap height={40} />
              
            </View>
            </ScrollView>
         
           
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',

    },
    content: {
        padding: 40,
        paddingTop: 0
    }
})
