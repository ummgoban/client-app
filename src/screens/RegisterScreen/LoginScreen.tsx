import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform} from 'react-native';

import {RootStackParamList} from '@/types/StackNavigationType';

import KakaoLoginButton from '@assets/KakaoLoginButton.svg';
import AppleLoginButton from '@assets/AppleLoginButton.svg';
import NaverLoginButton from '@assets/NaverLoginButton.svg';
import MomChanPickLogo from '@assets/MomChanPickLogo.svg';

import useProfile from '@/hooks/useProfile';

import S from './LoginScreen.style';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {login} = useProfile();

  return (
    <S.LoginPageContainer>
      <S.MomChanPickLogoWrapper>
        <MomChanPickLogo width={160} height={160} />
      </S.MomChanPickLogoWrapper>
      <S.LoginButtonContainer>
        <S.LoginButtonWrapper
          onPress={async () => {
            const res = await login('KAKAO');
            if (res) {
              navigation.navigate('Home', {screen: 'Feed'});
            }
          }}>
          <KakaoLoginButton />
        </S.LoginButtonWrapper>
        <S.LoginButtonWrapper
          onPress={async () => {
            const res = await login('NAVER');
            if (res) {
              navigation.navigate('Home', {screen: 'Feed'});
            }
          }}>
          <NaverLoginButton />
        </S.LoginButtonWrapper>

        {Platform.OS === 'ios' && (
          <S.LoginButtonWrapper
            onPress={async () => {
              const res = await login('APPLE');
              if (res) {
                navigation.navigate('Home', {screen: 'Feed'});
              }
            }}>
            <AppleLoginButton />
          </S.LoginButtonWrapper>
        )}
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
