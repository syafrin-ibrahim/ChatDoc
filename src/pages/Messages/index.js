import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {List} from '../../components/';
import { colors, fonts } from '../../utils';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from '../../assets';

const Messages = ({navigation}) => {
    const [doctors] = useState([{
        id: 1,
        profile: DummyDoctor1,
        name: 'Alexnder Bell',
        desc: 'Selamat Bergabung Choy'
    },
    {
        id: 2,
        profile: DummyDoctor2,
        name: 'Abraham Sold',
        desc: 'Silahkan Contack.. di Wa...'
    },
    {
        id: 3,
        profile: DummyDoctor3,
        name: 'Bella Sofia',
        desc: 'Good Luck Broo..'
    }]
    )
    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Messages</Text>
                {
                    doctors.map(doctor => {
                        return(
                            <List key={doctor.id} profile={doctor.profile} name={doctor.name} desc={doctor.desc} onPress={()=>navigation.navigate('Chat')}/>
                        )
                    })
                }
                
               
               
            </View>           
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({

    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },
    content: {
        backgroundColor: colors.white,
        flex:1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginLeft: 16
    }
})
