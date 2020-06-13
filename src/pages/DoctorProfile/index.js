import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, ProfileItem, Button, Gap } from '../../components';
import { colors } from '../../utils';

const DoctorProfile = ({navigation}) => {
    return (
        <View style={styles.page}>
            <Header title="header profile" onPress={()=> navigation.goBack()}/>
            <Profile name="isnawaty yahya" desc="Dokter Gigi" />
            <Gap height={10} />
            <ProfileItem label="Alumunus" value="Univesrsitas Gorontalo"/>
            <ProfileItem label="Tempat Praktik" value="Jl. Panjaitan"/>
            <ProfileItem label="No. STr" value="00000000123322221"/>
            <View style={styles.wrapper}>
             <Button title="star consultation" onPress={()=> navigation.navigate('Chat')}/>
            </View>
       </View>
    )
}

export default DoctorProfile

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    wrapper: {
        paddingHorizontal: 40,
        paddingTop: 23
    }
})
