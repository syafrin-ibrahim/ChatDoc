import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  HomeProfile,
  DoctorCategori,
  RatedDoctor,
  Gap,
  NewsItem,
} from '../../components';
import {fonts, colors, getData, showError, useForm} from '../../utils';
import {Fire} from '../../config';
import {JSONCategory, DummyDoctor1, NullPhoto, IcDoctor} from '../../assets';

const Doctor = ({navigation}) => {
  const [profile, setProfile] = useState({
    photo: NullPhoto,
    fullName: '',
    profession: '',
  });
  const [news, setNews] = useState([]);
  const [categ, setCateg] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getUserData();
    getNews();
    getCategDoctor();
    getTopRatedDoctor();
  }, []);

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then(res => {
        console.log('data ', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getCategDoctor = () => {
    Fire.database()
      .ref('category_doc/')
      .once('value')
      .then(res => {
        console.log('category  ', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setCateg(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : NullPhoto;
      setProfile(res);
    });
  };
  const getTopRatedDoctor = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        console.log('doctor  ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data hasil parse', data);
          setDoctors(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
            <Text style={styles.welcome}>
              Mau Konsultasi Dengan Siapa Hari Ini
            </Text>
          </View>
          <View style={styles.wrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categ.map(item => {
                  return (
                    <DoctorCategori
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctor</Text>
            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}

            <Text style={styles.sectionLabel}>Goog News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}

          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 12,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapper: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
});
