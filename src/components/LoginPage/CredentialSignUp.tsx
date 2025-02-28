import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';

import {useSignUpQuery} from '@/apis/auth';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const CredentialSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const {mutateAsync: signUp} = useSignUpQuery();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.ScreenWrapper>
      <S.LoginFormWrapper>
        <S.LoginTextInput
          label={'이름'}
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
        />
        <S.LoginTextInput
          label={'이메일'}
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          keyboardType="email-address"
        />
        <S.LoginTextInput
          label={'비밀번호'}
          value={password}
          onChange={e => setPassword(e.nativeEvent.text)}
          secureTextEntry
        />
        <S.LoginTextInput
          label={'비밀번호 확인'}
          value={passwordCheck}
          onChange={e => setPasswordCheck(e.nativeEvent.text)}
          secureTextEntry
        />
        <S.LoginTextInput
          label={'전화번호'}
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.nativeEvent.text)}
          keyboardType="phone-pad"
        />
        <S.SubmitButton
          mode="contained"
          disabled={!name || !email || !password || !phoneNumber}
          onPress={async () => {
            if (password !== passwordCheck) {
              Alert.alert('비밀번호가 일치하지 않습니다.');
              return;
            }

            const res = await signUp({
              email,
              password,
              name,
              phoneNumber,
            });

            if (res) {
              navigation.navigate('Home', {screen: 'Feed'});
              return;
            }

            Alert.alert('회원가입에 실패했습니다.');
          }}>
          회원가입
        </S.SubmitButton>
      </S.LoginFormWrapper>
    </S.ScreenWrapper>
  );
};

export default CredentialSignUp;
