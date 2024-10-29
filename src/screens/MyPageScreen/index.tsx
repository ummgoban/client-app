import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {getProfile} from '@/apis/Login';
import {RootStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';
import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<RootStackParamList, 'MyPage'>;

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
