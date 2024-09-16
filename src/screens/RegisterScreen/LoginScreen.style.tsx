import styled from '@emotion/native';
import {LoginPlatformProps} from './types';

const LogoImg = styled.Image`
  width: 82px;
  height: 102px;
`;

const TitleText = styled.Text`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const Description = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 234px;
  height: 57px;
  gap: 5px;
`;

const LoginButtonContainer = styled.View`
  display: flex;
  gap: 15px;
  marign: 45px;
  width: 300px
  height: 125px;
`;

const LoginButtonWrapper = styled.View`
  display: flex;
  flex: 1;
  width: 300px;
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const KakaoButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // 버튼이 가득 차도록 설정
  height: 100%; // 버튼이 가득 차도록 설정
  background-color: #fee500;
  border-radius: 12px;
`;

const NaverButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // 버튼이 가득 차도록 설정
  height: 100%; // 버튼이 가득 차도록 설정
  background-color: #03c75a;
  border-radius: 12px;
`;

const LoginText = styled.Text<LoginPlatformProps>`
  font-size: 16px;
  // TODO: 소셜로그인 디자인 논의 후 재정비 필요
  color: ${props => (props.platform === 'kakao' ? '#000' : '#fff')};
`;
const S = {
  LoginButtonContainer,
  LoginButtonWrapper,
  KakaoButton,
  NaverButton,
  LoginText,
  Description,
  TitleText,
  LogoImg,
};

export default S;