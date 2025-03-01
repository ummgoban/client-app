import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import {MyPageStackParamList} from '@/types/StackNavigationType';

import NonMemberMyPage from './NonMemberMyPage';
import UserMyPage from './UserMyPage';

type Props = StackScreenProps<MyPageStackParamList, 'MyPage'>;

const MyPageScreen = ({navigation}: Props) => {
  const {profile, refreshProfile} = useProfile();

  const {refreshing, onRefresh} = usePullDownRefresh(refreshProfile);

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
