import {login} from '@react-native-seoul/kakao-login';

export const signInWithKakao = async () => {
  try {
    const token = await login();
    console.log(token);
  } catch (error) {
    console.error(error);
  }
};
