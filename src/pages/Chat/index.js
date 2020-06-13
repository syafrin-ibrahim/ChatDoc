import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors } from '../../utils'

const Chat = ({navigation}) => {
    return (
        <View style={styles.page}>
            <Header type="dark-profile" onPress={()=>navigation.goBack()}/>
            <View style={styles.content}>
                <Text style={styles.date} >Senin, 21. Maret 2020</Text>
                <ChatItem isMe/>
                <ChatItem />
                <ChatItem isMe/>
            </View>
            <InputChat />
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    content: {
        flex: 1 
    },
    date: {
        fontSize: 11,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary,
        marginVertical: 20,
        textAlign: 'center'
    }
})
