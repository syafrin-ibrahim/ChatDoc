import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CatUmum, CatPsikiater, CatObat } from '../../../assets'
import { colors, fonts } from '../../../utils'

const DoctorCategori = ({categ, onPress}) => {
    const Icon = ()=>{
        if(categ === 'umum'){
            return <CatUmum style={styles.illus}/>
        }
        if(categ === 'psikiater'){
            return <CatPsikiater style={styles.illus}/>
        }
        if(categ === 'obat'){
            return <CatObat style={styles.illus}/>
        }
        return <CatUmum style={styles.illus}/>
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon  />
            <Text style={styles.label}>Saya Butuh </Text>
            <Text style={styles.categ}>{categ}</Text>
        </TouchableOpacity>
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
