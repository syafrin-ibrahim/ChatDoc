import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Header, Button, Link, Gap } from '../../components';
import { NullPhoto, AddPhoto, RemovePhoto } from '../../assets';
import { colors, fonts, storeData } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { Fire } from '../../config';

const  UploadFoto = ({navigation, route}) => {
    const { fullName, profession, uid } = route.params;
    const [hasFoto, setHasFoto] = useState(false);
    const [foto, setFoto] = useState(NullPhoto);
    const [fotoDb, setFotoDb] = useState('');

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
                setFotoDb(`data:${response.type};base64, ${response.data}`);              
                const source = { uri: response.uri }
                setFoto(source);
                setHasFoto(true);

            }
        });

    }
    const uploadContinue = () => {
        Fire.database()
        .ref('users/' + uid + '/')
        .update({photo: fotoDb})
      
        const data = route.params;
        data.photo = fotoDb;
        storeData('user', data);
        
        navigation.replace('MainApp')
     
    }
    return (
        <View style={styles.page}>
            <Header title="Upload Foto" onPress={()=> navigation.goBack()} />
            <View style={styles.content} >
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.wrapper} onPress={getImage}>
                        <Image source={foto} style={styles.avatar}/>
                        {hasFoto &&  <RemovePhoto style={styles.addphoto}/> }
                        { !hasFoto && <AddPhoto style={styles.addphoto} /> }
                       
                    </TouchableOpacity>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.work}>{profession}</Text>
                </View>
                <View style={styles.work}>
                    <Button disable={!hasFoto} title="Upload And Continue" onPress={uploadContinue} />
                    <Gap height={30} />
                    <Link title="Skip For This" align="center" size={16} onPress={()=> navigation.replace('MainApp')}/>
                </View>
            </View>
        </View>
    )
}


export default UploadFoto;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 40,
        paddingBottom: 64,
       
        flex: 1,
        justifyContent: 'space-between'
    },
    profile: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    avatar : {
        width: 110,
        height: 110,
        borderRadius: 110/2
    },
    wrapper: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 130/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addphoto: {
        position: 'absolute',
        bottom: 8,
        right: 6
    },
    name : {
        fontSize: 24,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    work: {
        fontSize: 18,
        color: colors.text.secondary,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        marginTop: 4   
    }
})
