import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';

import {login} from '@/apis/Login';
import {RootStackParamList} from '@/types/StackNavigationType';
import KakaoLoginButton from '../../assets/KakaoLoginButton.svg';
import AppleLoginButton from '../../assets/AppleLoginButton.svg';
import NaverLoginButton from '../../assets/NaverLoginButton.svg';
import S from './LoginScreen.style';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <S.LoginPageContainer>
      <S.LoginButtonContainer>
        <S.LogoImg source={require('../../assets/logo.png')} />
        <S.Description>
          <S.TitleText>마감 세일 상품을</S.TitleText>
          <S.TitleText>서프라이즈 백으로 만나보세요</S.TitleText>
        </S.Description>
        <S.LoginButtonContainer>
          <S.LoginButtonWrapper>
            {/* TODO: 애플 로그인 적용 시 props로 분기 필요 */}
            <S.KakaoButton
              onPress={async () => {
                const res = await login('KAKAO');
                if (res) {
                  navigation.navigate('Home', {screen: 'Feed'});
                }
              }}>
              <S.KakaoButtonText>카카오 로그인 시작하기</S.KakaoButtonText>
            </S.KakaoButton>
          </S.LoginButtonWrapper>
          <S.LoginButtonWrapper>
            <S.NaverButton
              onPress={async () => {
                const res = await login('NAVER');
                if (res) {
                  navigation.navigate('Home', {screen: 'Feed'});
                }
              }}>
              <S.NaverButtonText>네이버 로그인 시작하기</S.NaverButtonText>
            </S.NaverButton>
          </S.LoginButtonWrapper>
        </S.LoginButtonContainer>
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
