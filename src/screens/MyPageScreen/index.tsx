import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import EmptyComponent from '@/components/common/EmptyComponent';

import {MyPageStackParamList} from '@/types/StackNavigationType';

import UserMyPage from './UserMyPage';

type Props = StackScreenProps<MyPageStackParamList, 'MyPage'>;

const MyPageScreen = ({navigation}: Props) => {
  const {profile, refreshProfile} = useProfile();

  const {refreshing, onRefresh} = usePullDownRefresh(refreshProfile);

  if (!profile) {
    return (
      <EmptyComponent
        title="로그인 후 판매 중인 반찬을 예약해보세요."
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
        buttonText="로그인 및 회원가입하기"
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
