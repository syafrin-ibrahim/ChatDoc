import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { fonts, colors } from "../../utils";
import { HospitalBg, Hospital1, Hospital2, Hospital3 } from '../../assets'
import { ListHospital } from '../../components';

const Hospitals = () => {
    return (
        <View style={styles.page}>
            <ImageBackground source={HospitalBg} style={styles.background}>
                <Text style={styles.title}>Nearby Hospitals</Text>
                <Text style={styles.desc}>3 Tersedia</Text>
            </ImageBackground>
            <View style={styles.content}>

              
                <ListHospital type="rumah sakit" name="rumah sakit jiwa umum" address="Jakarta Timur" pic={Hospital1}/>
                <ListHospital type="rumah sakit anak" name="rumah sakit anak" address="Jakarta Barat" pic={Hospital2}/>
                <ListHospital type="rumah sakit jiwa" name="rumah sakit jiwa" address="Jakarta Selatan" pic={Hospital3}/>
            </View>
        </View>
    )
}

export default Hospitals

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },  
    background: {
        height: 240,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white,
        textAlign: 'center'
    },
    desc: {
        fontSize: 14,
        fontFamily: fonts.primary[300],
        color: colors.white,
         marginTop: 6,
         textAlign: 'center'

    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 20,
        flex:1,
        marginTop: -30,
        paddingTop: 14
    }
})
