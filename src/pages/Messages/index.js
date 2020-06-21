import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components/';
import {colors, fonts, getData} from '../../utils';
import {Fire} from '../../config';

const Messages = ({navigation}) => {
  //   const [doctors] = useState([
  //     {
  //       id: 1,
  //       profile: DummyDoctor1,
  //       name: 'Alexnder Bell',
  //       desc: 'Selamat Bergabung Choy',
  //     },
  //     {
  //       id: 2,
  //       profile: DummyDoctor2,
  //       name: 'Abraham Sold',
  //       desc: 'Silahkan Contack.. di Wa...',
  //     },
  //     {
  //       id: 3,
  //       profile: DummyDoctor3,
  //       name: 'Bella Sofia',
  //       desc: 'Good Luck Broo..',
  //     },
  //   ]);

  const [historyChat, setHistoryChat] = useState([]);
  const [user, setUser] = useState({});
  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };
  useEffect(() => {
    getDataUserFromLocal();
    const rootDb = Fire.database().ref();
    const urlHistory = `messages/${user.uid}`;
    const messageDb = rootDb.child(urlHistory);

    messageDb.on('value', async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const detail_doc = await rootDb.child(urlUidDoctor).once('value');
          data.push({
            id: key,
            detailDoctor: detail_doc.val(),
            ...oldData[key],
          });
        });
        await Promise.all(promises);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastTextChat}
              onPress={() => navigation.navigate('Chat', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
