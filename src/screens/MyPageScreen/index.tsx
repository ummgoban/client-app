import {RootStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';
import {getUserProfile} from '@apis/User';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<RootStackParamList, 'MyPage'>;

const MyPageScreen = ({navigation}: Props) => {
  const [profile, setProfile] = React.useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserProfile();
      console.log(res);

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
