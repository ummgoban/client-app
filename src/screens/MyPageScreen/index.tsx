import {getProfile} from '@/apis/Login';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MyPageStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<MyPageStackParamList, 'MyPage'>;

const MyPageScreen = ({navigation}: Props) => {
  const [profile, setProfile] = useState<UserType | null>(null);

  const isFocused = useIsFocused();

  const fetchProfile = async () => {
    const res = await getProfile();
    setProfile(res);
  };

  const {refreshing, onRefresh} = usePullDownRefresh(fetchProfile);

  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused]);

  if (!profile) {
    return (
      <NonMemberMyPage
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
      />
    );
  }

  return (
    <UserMyPage
      profile={profile}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default MyPageScreen;
