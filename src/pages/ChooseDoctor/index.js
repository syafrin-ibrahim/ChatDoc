import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ListDoctor } from '../../components'
import { colors } from '../../utils'
import { DummyDoctor1 } from '../../assets'

const ChooseDoctor = ({navigation}) => {
    return (
        <View>
            <Header type="dark" title="Pilih Dokter Anak" onPress={()=>navigation.goBack()}/>
            <ListDoctor type="next" profile={DummyDoctor1} name="Beliana Motor" desc="Wanita" onPress={()=> navigation.navigate('Chat')}/>
            <ListDoctor type="next" profile={DummyDoctor1} name="Beliana Motor" desc="Wanita"/>
            <ListDoctor type="next" profile={DummyDoctor1} name="Beliana Motor" desc="Wanita"/>
            <ListDoctor type="next" profile={DummyDoctor1} name="Beliana Motor" desc="Wanita"/>
            <ListDoctor type="next" profile={DummyDoctor1} name="Beliana Motor" desc="Wanita"/>
            
        </View>
    )
}

export default ChooseDoctor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})
