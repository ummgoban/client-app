import React from 'react';
import {Alert} from 'react-native';
import {Text} from 'react-native-paper';
import S from './Profile.style';

const Profile = ({name, image}: {name: string; image: string}) => {
  return (
    <S.ProfileContainer>
      <S.ProfileImage source={{uri: image}} width={64} height={64} />
      <S.ProfileInfo>
        <Text>{`${name} 님`}</Text>
        <S.LinkLayout>
          <S.LinkContainer>
            <S.Link onPress={() => Alert.alert('주문 내역으로 이동')}>
              <S.LinkText>주문 내역</S.LinkText>
            </S.Link>
          </S.LinkContainer>
          <S.LinkContainer>
            <S.Link onPress={() => Alert.alert('프로필로 이동')}>
              <S.LinkText>프로필</S.LinkText>
            </S.Link>
          </S.LinkContainer>
        </S.LinkLayout>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;
