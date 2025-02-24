import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';

import {credentialLogin} from '@/apis/Login';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const CredentialLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.LoginFormWrapper>
      <S.LoginTextInput
        label={'아이디'}
        value={email}
        onChange={e => setEmail(e.nativeEvent.text)}
      />
      <S.LoginTextInput
        label={'비밀번호'}
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
        secureTextEntry
      />
      <S.SubmitButton
        mode="contained"
        disabled={!email || !password}
        onPress={async () => {
          const res = await credentialLogin({email, password});
          if (res) {
            navigation.navigate('Home', {screen: 'Feed'});
            return;
          }

          Alert.alert('로그인에 실패했습니다.');
        }}>
        로그인
      </S.SubmitButton>
      <S.SignUpButton
        mode="text"
        onPress={() => {
          navigation.navigate('Register', {screen: 'SignUp'});
        }}>
        회원가입
      </S.SignUpButton>
      <S.HorizontalLine />
    </S.LoginFormWrapper>
  );
};

export default CredentialLogin;
