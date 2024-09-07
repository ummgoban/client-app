import React from 'react';
import {Alert} from 'react-native';
import {Button, Text} from 'react-native-paper';
import S from './Profile.style';

const Profile = ({name, image}: {name: string; image: string}) => {
  return (
    <S.ProfileContainer>
      <S.ProfileImage source={{uri: image}} width={64} height={64} />
      <S.ProfileInfo>
        <Text>{`${name} 님`}</Text>
        <Button onPress={() => Alert.alert('주문 내역으로 이동')}>
          주문 내역
        </Button>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;
