import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IcDoctor, IcMessages, IcHospital, IcDoctorActive, IcMessagesActive, IcHospitalActive } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = ()=>{
        if(title === 'Doctor'){
            return active ? <IcDoctorActive /> : <IcDoctor />
        }
        if(title === 'Messages'){
            return active ? <IcMessagesActive /> : <IcMessages />
        }
        if(title === 'Hospitals'){
            return active ? <IcHospitalActive /> : <IcHospital />
        }
        return <IcDoctor />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon />
        <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
  container: {
      alignItems: 'center'
  },
  text: (active)=>(
                {
                    fontSize: 10,
                    color: active ? colors.text.active : colors.text.inactive,
                    fontFamily: fonts.primary[600],
                    marginTop: 4
                }   
            )
})

