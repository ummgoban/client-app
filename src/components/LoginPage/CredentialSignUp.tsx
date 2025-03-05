import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';

import useProfile from '@/hooks/useProfile';

import TextInput from '../common/TextInput/TextInput';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const validateNameLength = (val: string) => {
  return val.length >= 2 && val.length <= 10;
};

const validateEmail = (val: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
};

const validatePasswordLength = (val: string) => {
  return val.length >= 8;
};

const validatePassword = (origin: string, check: string) => {
  return origin === check;
};

const validatePhoneNumber = (val: string) => {
  return /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(val);
};

const CredentialSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const {signUp} = useProfile();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.ScreenWrapper>
      <S.LoginFormWrapper>
        <TextInput
          placeholder={'이름'}
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          validation={validateNameLength}
          errorMessage="이름은 2자 이상 10자 이하로 입력해주세요."
        />
        <TextInput
          placeholder={'이메일'}
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          validation={validateEmail}
          errorMessage="이메일 형식을 맞춰주세요.(예 ummgoban@gmail.com)"
          keyboardType="email-address"
        />
        <TextInput
          placeholder={'비밀번호'}
          value={password}
          onChange={e => setPassword(e.nativeEvent.text)}
          validation={validatePasswordLength}
          errorMessage="비밀번호는 8자 이상으로 입력해주세요."
          secureTextEntry
        />
        <TextInput
          placeholder={'비밀번호 확인'}
          value={passwordCheck}
          onChange={e => setPasswordCheck(e.nativeEvent.text)}
          secureTextEntry
          validation={() => validatePassword(password, passwordCheck)}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <TextInput
          placeholder={'전화번호 (010-1234-5678)'}
          value={phoneNumber}
          onChange={e => {
            const value = e.nativeEvent.text;
            if (value.length === 11) {
              // set 01012345678 -> 010-1234-5678
              const formatted = value.replace(
                /(\d{3})(\d{4})(\d{4})/,
                '$1-$2-$3',
              );
              setPhoneNumber(formatted);
            } else {
              setPhoneNumber(value);
            }
          }}
          validation={validatePhoneNumber}
          errorMessage="전화번호 형식을 맞춰주세요. (010-1234-5678)"
          keyboardType="phone-pad"
          maxLength={13}
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
