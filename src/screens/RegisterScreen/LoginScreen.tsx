import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import React from 'react';
import S from './LoginScreen.style';
import {signInWithKakao, signInWithNaver} from '@/apis/Login';

const LoginScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const handleKakaoLogin = async () => {
    const isLogin = await signInWithKakao();
    if (isLogin) {
      console.log('로그인 성공');
      navigation.navigate('Home', {
        screen: 'Feed',
      });
    } else {
      // 로그인 실패 처리
      Alert.alert('로그인 실패', '카카오 로그인이 실패하였습니다.');
    }
  };

  const handleNaverLogin = async () => {
    console.log('asdf');
    const isLogin = await signInWithNaver();
    if (isLogin) {
      console.log('로그인 성공');
      navigation.navigate('Home', {
        screen: 'Feed',
      });
    } else {
      Alert.alert('로그인 실패', '네이버 로그인이 실패하였습니다.');
    }
  };

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
            <S.KakaoButton onPress={handleKakaoLogin}>
              <S.KakaoButtonText>카카오 로그인 시작하기</S.KakaoButtonText>
            </S.KakaoButton>
          </S.LoginButtonWrapper>
          <S.LoginButtonWrapper>
            <S.NaverButton onPress={handleNaverLogin}>
              <S.NaverButtonText>네이버 로그인 시작하기</S.NaverButtonText>
            </S.NaverButton>
          </S.LoginButtonWrapper>
        </S.LoginButtonContainer>
      </S.LoginButtonContainer>
    </S.LoginPageContainer>
  );
};

export default LoginScreen;
