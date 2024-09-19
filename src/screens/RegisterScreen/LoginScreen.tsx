// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../../types/StackNavigationType';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import S from './LoginScreen.style';
import {signInWithKakao} from '@/apis/Login';
type Props = {
  // navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <S.LogoImg source={require('../../assets/logo.png')} />
      <S.Description>
        <S.TitleText>마감 세일 상품을</S.TitleText>
        <S.TitleText>서프라이즈 백으로 만나보세요</S.TitleText>
      </S.Description>
      <S.LoginButtonContainer>
        <S.LoginButtonWrapper>
          {/* TODO: 애플 로그인 적용 시 props로 분기 필요 */}
          <S.KakaoButton onPress={signInWithKakao}>
            <S.KakaoButtonText>카카오 로그인 시작하기</S.KakaoButtonText>
          </S.KakaoButton>
        </S.LoginButtonWrapper>
        <S.LoginButtonWrapper>
          <S.NaverButton>
            <S.NaverButtonText>네이버 로그인 시작하기</S.NaverButtonText>
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
