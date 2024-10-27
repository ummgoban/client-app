import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {logout} from '@/apis/Login';
import {RootStackParamList} from '@/types/StackNavigationType';

import S from './Profile.style';

const Profile = ({name, image}: {name: string; image?: string}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.ProfileContainer>
      <S.ProfileImage
        source={{
          uri:
            image ||
            // TODO: 이미지 경로 수정
            'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
        }}
        width={64}
        height={64}
      />
      <S.ProfileInfo>
        <Text>{`${name} 님`}</Text>
        <S.LinkLayout>
          <S.LinkContainer>
            <S.Link
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'OrderHistory',
                })
              }>
              <S.LinkText>주문 내역</S.LinkText>
            </S.Link>
          </S.LinkContainer>

          <Button
            onPress={async () => {
              const res = await logout();
              if (res) {
                Alert.alert('로그아웃 되었습니다.', '', [
                  {
                    text: '확인',
                    onPress: () => {
                      navigation.navigate('Home', {screen: 'Feed'});
                    },
                  },
                ]);
              }
            }}>
            로그아웃
          </Button>
        </S.LinkLayout>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
};

export default Profile;
