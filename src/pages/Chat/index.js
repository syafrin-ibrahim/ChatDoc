import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, ChatItem, InputChat} from '../../components';
import {
  fonts,
  colors,
  getData,
  showError,
  getChatTime,
  setDateChat,
} from '../../utils';
import {Fire} from '../../config';

const Chat = ({navigation, route}) => {
  const doctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatItem, setChatItem] = useState([]);

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    });
    const urlFirebase = `chatting/${user.uid}_${doctor.data.uid}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          const dataSnap = snapshot.val();
          const allChat = [];
          Object.keys(dataSnap).map(item => {
            const dataChat = dataSnap[item];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allChat.push({
              id: item,
              data: newDataChat,
            });
          });
          console.log('all data', allChat);
          setChatItem(allChat);
        }
      });
  }, [doctor.data.uid, user.uid]);

  const chatSend = () => {
    const today = new Date();
    const urlFirebase = `chatting/${user.uid}_${
      doctor.data.uid
    }/allChat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${user.uid}_${
      doctor.data.uid
    }`;
    const urlMessageDoc = `messages/${doctor.data.uid}/${user.uid}_${
      doctor.data.uid
    }`;
    const dataHistoryForUser = {
      lastTextChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: doctor.data.uid,
    };
    const dataHistoryForDoc = {
      lastTextChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    console.log('data chat', data);
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');
        //set data history caht user
        Fire.database()
          .ref(urlMessageUser)
          .set(dataHistoryForUser);
        //set data history chat for doctor
        Fire.database()
          .ref(urlMessageDoc)
          .set(dataHistoryForDoc);
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        onPress={() => navigation.goBack()}
        title={doctor.data.fullName}
        desc={doctor.data.category}
        photo={{uri: doctor.data.photo}}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatItem.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.date}>{chat.id}</Text>
                {chat.data.map(item => {
                  const mine = item.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={item.id}
                      isMe={mine}
                      text={item.data.chatContent}
                      date={item.data.chatTime}
                      photo={mine ? null : {uri: doctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
