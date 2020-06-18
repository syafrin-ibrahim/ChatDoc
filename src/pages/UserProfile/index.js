import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Header, Profile, List, Gap} from '../../components'
import { getData } from '../../utils'
import { NullPhoto } from '../../assets'
import { showMessage } from 'react-native-flash-message';
import { Fire } from '../../config'

const UserProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName: '',
        prof: '',
        photo: NullPhoto
    })

    useEffect(()=>{
        getData('user').then(res => {
            console.log(res)
            const data = res;
            data.photo = { uri: res.photo }
            setProfile(data)
        });
    }, [])
    const signOut = ()=>{
        Fire.auth().signOut().then(() => {
            console.log('success sign out');
            navigation.replace('GetStarted');
        }).catch(err => {
            showMessage({
                message: err.message,
                backgroundColor: colors.error,
                color: colors.white,
                type: 'default'
            })
        });

    }
    return (
        <View style={styles.page}>
            <Header title="Profile"  onPress={()=> navigation.goBack()}/>
            <Gap height={10} />
            {profile.fullName.length > 0 &&  <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo} /> }
           
            <Gap height={14} />
            <List name="Edit Profile" desc="Last Update Yesterday" type="next" icon="edit-profile" onPress={()=> navigation.navigate('UpdateProfile')}/>
            <List name="Language" desc="Last Update Yesterday" type="next" icon="language"/>
            <List name="Give Us Rate" desc="Last Update Yesterday" type="next" icon="rate"/>
            <List name="Sign Out" desc="Last Update Yesterday" type="next" icon="help" onPress={signOut}/>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    }
})
