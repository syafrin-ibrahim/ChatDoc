import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { HomeProfile, DoctorCategori, RatedDoctor, Gap, NewsItem } from '../../components'
import { fonts, colors } from '../../utils'
import { JSONCategory} from '../../assets';

const Doctor = ({navigation}) => {
    return (
        <View style={styles.page}>
            
            <View style={styles.content}>
               <ScrollView showsVerticalScrollIndicator={false}>
                   <View style={styles.wrapperSection}>
                        <Gap height={30} />
                        <HomeProfile />
                        <Text style={styles.welcome}>Mau Konsultasi Dengan Siapa Hari Ini</Text>
                   </View>
                <View style={styles.wrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.category}>
                            <Gap width={32}/>
                            {
                                JSONCategory.data.map(item => {
                                    return(
                                        <DoctorCategori key={item.id} category={item.category} onPress={()=> navigation.navigate("ChooseDoctor")}/>
                                    )
                                })
                            }
                            <Gap width={22}/>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.wrapperSection}>
                    <Text style={styles.sectionLabel}>Top Rated Doctor</Text>
                    <RatedDoctor />
                    <RatedDoctor />
                    <RatedDoctor />
                    <Text style={styles.sectionLabel}>Goog News</Text>
                </View>               
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <Gap height={30} />
                </ScrollView>
            </View>
           

        </View>
    )
}

export default Doctor

const styles = StyleSheet.create({
    page: {
       
        backgroundColor: colors.secondary,
        flex: 1
    },
    content:{

       
        backgroundColor: colors.white,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 12
    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 209
    },
    category: {
        flexDirection: 'row'
    },
    wrapper:{
        marginHorizontal: -16
    },
    sectionLabel: {
        fontSize: 16, 
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16
    },
    wrapperSection:{
        paddingHorizontal: 16
    }
})