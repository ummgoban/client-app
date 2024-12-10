import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform} from 'react-native';

import {login} from '@/apis/Login';
import {RootStackParamList} from '@/types/StackNavigationType';
import S from './LoginScreen.style';

import KakaoLoginButton from '@assets/KakaoLoginButton.svg';
import AppleLoginButton from '@assets/AppleLoginButton.svg';
import NaverLoginButton from '@assets/NaverLoginButton.svg';
import MomChanPickLogo from '@assets/MomChanPickLogo.svg';
const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
