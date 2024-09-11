// import axios from 'axios';
import {LoginRequestType} from './types';
import {login} from '@react-native-seoul/kakao-login';

const axiosSocialLogin = async (request: LoginRequestType): Promise<void> => {
  try {
    const token = await login();
    // TODO: api 확정 시 변경 필요
    console.log(request);
    // const response = await axios.post('api/login', request);

    // console.log('Login success', response.data);
    console.log(token);
  } catch (error) {
    // console.error('Login fail', error);
  }
};

export const signInWithKakao = async (): Promise<void> => {
  try {
    const token = await login();
    console.log(JSON.stringify(token));
    const request: LoginRequestType = {
      providerType: 'KAKAO',
      // TODO: 역할에 따른 구분 필요
      rolesType: 'ROLE_USER',
      token: token.accessToken,
    };
    console.log(request);
    // await axiosSocialLogin(request);
  } catch (err) {
    console.log('error');
  }
};

export const signInWithNaver = async (): Promise<void> => {
  try {
    // FIXME: 네이버 소셜로그인 라이브러리 적용 이후 변경 필요
    const token = await login();
    const request: LoginRequestType = {
      providerType: 'NAVER',
      // TODO: 백엔드 논의 필요
      state: '뭐가들어가야되죠',
      // TODO: 역할에 따른 구분 필요
      rolesType: 'ROLE_USER',
      token: token.accessToken,
    };
    await axiosSocialLogin(request);
  } catch (err) {
    console.log('error');
  }
};
