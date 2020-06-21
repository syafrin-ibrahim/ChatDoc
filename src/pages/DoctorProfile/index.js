import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Profile, ProfileItem, Button, Gap} from '../../components';
import {colors} from '../../utils';

const DoctorProfile = ({navigation, route}) => {
  const doctor = route.params;
  return (
    <View style={styles.page}>
      <Header title="header profile" onPress={() => navigation.goBack()} />
      <Profile
        name={doctor.data.fullName}
        desc={doctor.data.profession}
        photo={{uri: doctor.data.photo}}
      />
      <Gap height={10} />
      <ProfileItem label="Alumunus" value={doctor.data.university} />
      <ProfileItem
        label="Tempat Praktik"
        value={doctor.data.hospital_address}
      />
      <ProfileItem label="No. STr" value={doctor.data.str_number} />
      <View style={styles.wrapper}>
        <Button
          title="star consultation"
          onPress={() => navigation.navigate('Chat', doctor)}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
