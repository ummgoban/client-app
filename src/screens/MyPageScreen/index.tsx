import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {getUserProfile} from '../../apis/User';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../../types/StackNavigationType';
import {UserType} from '../../types/UserType';
import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const MyPageScreen = ({navigation}: Props) => {
  const [profile, setProfile] = React.useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserProfile();
      if (!res) {
        Alert.alert('프로필을 불러오는데 실패했습니다.');
        return;
      }

      setProfile(res);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <NonMemberMyPage
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
      />
    );
  }

  return <UserMyPage profile={profile} />;
};

export default MyPageScreen;
