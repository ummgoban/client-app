import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image, Text} from 'react-native';
import {RootStackParamList} from '../../types/StackNavigationType';
import S from './LoginScreen.style';
import {signInWithKakao, signInWithNaver} from './LoginLogic';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const LoginScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <S.LogoImg source={require('../../assets/logo.png')} />
      <S.Description>
        <S.TitleText>마감 세일 상품을</S.TitleText>
        <S.TitleText>서프라이즈 백으로 만나보세요</S.TitleText>
      </S.Description>
      <S.LoginButtonContainer>
        <S.LoginButtonWrapper>
          <S.KakaoButton onPress={signInWithKakao}>
            <S.LoginText platform="kakao">카카오 로그인 시작하기</S.LoginText>
          </S.KakaoButton>
        </S.LoginButtonWrapper>
        <S.LoginButtonWrapper>
          <S.NaverButton onPress={signInWithNaver}>
            <S.LoginText platform="naver">네이버 로그인 시작하기</S.LoginText>
          </S.NaverButton>
        </S.LoginButtonWrapper>
      </S.LoginButtonContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
