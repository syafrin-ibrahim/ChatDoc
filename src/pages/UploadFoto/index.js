import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Header, Button, Link, Gap } from '../../components';
import { NullPhoto, AddPhoto } from '../../assets';
import { colors, fonts } from '../../utils';

const  UploadFoto = ({navigation}) => {
    return (
        <View style={styles.page}>
            <Header title="Upload Foto" onPress={()=> navigation.goBack()} />
            <View style={styles.content} >
                <View style={styles.profile}>
                    <View style={styles.wrapper}>
                        <Image source={NullPhoto} style={styles.avatar}/>
                        <AddPhoto style={styles.addphoto} />
                    </View>
                    <Text style={styles.name}>Abraham Lincoln</Text>
                    <Text style={styles.work}>Product Designer</Text>
                </View>
                <View style={styles.work}>
                    <Button title="Upload And Continue" onPress={()=> navigation.replace('MainApp')} />
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
        height: 110
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
