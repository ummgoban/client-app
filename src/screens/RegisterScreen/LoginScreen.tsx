import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform} from 'react-native';

import AppleLoginButton from '@assets/AppleLoginButton.svg';
// import KakaoLoginButton from '@assets/KakaoLoginButton.svg';
import MomChanPickLogo from '@assets/MomChanPickLogo.svg';
// import NaverLoginButton from '@assets/NaverLoginButton.svg';

import {RootStackParamList} from '@/types/StackNavigationType';

import CredentialLogin from '@/components/LoginPage/CredentialLogin';

import useProfile from '@/hooks/useProfile';

import S from './LoginScreen.style';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {loginWithOAuth} = useProfile();

  return (
    <S.LoginPageContainer>
      <S.MomChanPickLogoWrapper>
        <MomChanPickLogo width={160} height={160} />
      </S.MomChanPickLogoWrapper>
      <CredentialLogin />
      {/* TODO: 앱 배포 후 소셜 로그인 허용 */}
      {Platform.OS === 'ios' && (
        <S.SocialLoginText>{'소셜 로그인'}</S.SocialLoginText>
      )}
      {Platform.OS === 'ios' && (
        <S.LoginButtonContainer>
          {/* <S.LoginButtonWrapper
          onPress={async () => {
            const res = await loginWithOAuth('KAKAO');
            if (res) {
              navigation.navigate('Home', {screen: 'Feed'});
            }
          }}>
          <KakaoLoginButton />
        </S.LoginButtonWrapper>
        <S.LoginButtonWrapper
          onPress={async () => {
            const res = await loginWithOAuth('NAVER');
            if (res) {
              navigation.navigate('Home', {screen: 'Feed'});
            }
          }}>
          <NaverLoginButton />
        </S.LoginButtonWrapper> */}
          <S.LoginButtonWrapper
            onPress={async () => {
              const res = await loginWithOAuth('APPLE');
              if (res) {
                navigation.navigate('Home', {screen: 'Feed'});
              }
            }}>
            <AppleLoginButton />
          </S.LoginButtonWrapper>
        </S.LoginButtonContainer>
      )}
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
