import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Header, Profile, List, Gap} from '../../components'

const UserProfile = ({navigation}) => {
    return (
        <View style={styles.page}>
            <Header title="Profile"  onPress={()=> navigation.goBack()}/>
            <Gap height={10} />
            <Profile name="Beatrick Javeline" desc="Product Designer" />
            <Gap height={14} />
            <List name="Edit Profile" desc="Last Update Yesterday" type="next" icon="edit-profile" onPress={()=> navigation.navigate('UpdateProfile')}/>
            <List name="Edit Profile" desc="Last Update Yesterday" type="next" icon="language"/>
            <List name="Edit Profile" desc="Last Update Yesterday" type="next" icon="rate"/>
            <List name="Edit Profile" desc="Last Update Yesterday" type="next" icon="help"/>
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
