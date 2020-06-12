import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CatUmum } from '../../../assets'
import { colors, fonts } from '../../../utils'

const DoctorCategori = () => {
    return (
        <View style={styles.container}>
            <CatUmum style={styles.illus}  />
            <Text style={styles.label}>Saya Butuh </Text>
            <Text style={styles.categ}>Dokter Umum</Text>
        </View>
    )
}

export default DoctorCategori

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.CardLight,
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginRight: 10,
        width: 100,
        height: 130
    },
    illus: {
        marginBottom: 28
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.primary
    },
    categ: {
        fontSize: 10,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    }
})
