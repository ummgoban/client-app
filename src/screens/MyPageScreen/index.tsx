import React, {useEffect} from 'react';

import {getProfile} from '@/apis/Login';
import {RootStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';
import {StackScreenProps} from '@react-navigation/stack';
import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<RootStackParamList, 'MyPage'>;

const MyPageScreen = ({navigation}: Props) => {
  const [profile, setProfile] = React.useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();

      if (!res) {
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
