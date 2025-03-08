import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import useProfile from '@/hooks/useProfile';

import TextInput from '../common/TextInput/TextInput';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const validateNameLength = (val: string) => {
  return /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/i.test(val);
};

const validateEmail = (val: string) => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/i.test(val);
};

const validateEmailCode = (val: string) => {
  return val.length === 6;
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
  // <-- signup form -->
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  // <-- signup form -->

  // <-- email 인증 -->
  const [isValidationEmail, setIsValidationEmail] = useState(false);
  const [isPendingValidationEmail, setIsPendingValidationEmail] =
    useState(false);
  const [emailCode, setEmailCode] = useState('');
  // <-- email 인증 -->

  const {
    signUp,
    sendEmailCode,
    verifyEmailCode,
    isPendingSendEmailCode,
    isPendingVerifyEmailCode,
  } = useProfile();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.ScreenWrapper>
      <S.LoginFormWrapper>
        <TextInput
          label={'이름'}
          placeholder={'이름'}
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
          validation={validateNameLength}
          errorMessage="이름은 2자 이상 10자 이하로 입력해주세요."
        />
        <S.EmailVerifyContainer>
          <TextInput
            label={'이메일'}
            placeholder={'이메일'}
            value={email}
            onChange={e => setEmail(e.nativeEvent.text)}
            validation={validateEmail}
            keyboardType="email-address"
          />
          <S.SendEmailCodeButton
            disabled={!validateEmail(email) || isPendingSendEmailCode}
            onPress={() => {
              setIsValidationEmail(false);
              setEmailCode('');
              sendEmailCode(
                {email},
                {
                  onSuccess: setIsPendingValidationEmail,
                  onError: error =>
                    Alert.alert(error.errorMessage ?? error.message),
                },
              );
            }}>
            {isPendingSendEmailCode
              ? '인증번호 발송 중'
              : isPendingValidationEmail
                ? '인증번호 재발송'
                : '인증번호 발송'}
          </S.SendEmailCodeButton>
          {isPendingSendEmailCode && (
            <ActivityIndicator size="small" animating={true} />
          )}
        </S.EmailVerifyContainer>
        {isPendingValidationEmail && (
          <S.EmailVerifyContainer>
            <TextInput
              label="인증번호"
              placeholder="XXXXXX"
              value={emailCode}
              onChange={e => setEmailCode(e.nativeEvent.text)}
              validation={validateEmailCode}
              errorMessage="인증코드 6자리를 입력해주세요."
              disabled={isValidationEmail}
            />
            <S.VerifyEmailCodeButton
              disabled={
                !validateEmailCode(emailCode) ||
                isPendingVerifyEmailCode ||
                isValidationEmail
              }
              onPress={() =>
                verifyEmailCode(
                  {email, code: emailCode},
                  {
                    onSuccess: setIsValidationEmail,
                  },
                )
              }>
              {'인증번호 확인'}
            </S.VerifyEmailCodeButton>
          </S.EmailVerifyContainer>
        )}
        {isValidationEmail && (
          <>
            <TextInput
              label={'비밀번호'}
              placeholder={'비밀번호'}
              value={password}
              onChange={e => setPassword(e.nativeEvent.text)}
              validation={validatePasswordLength}
              errorMessage="비밀번호는 8자 이상으로 입력해주세요."
              secureTextEntry
            />
            <TextInput
              label={'비밀번호 확인'}
              placeholder={'비밀번호 확인'}
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.nativeEvent.text)}
              secureTextEntry
              validation={() => validatePassword(password, passwordCheck)}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
            <TextInput
              label={'전화번호'}
              placeholder={'010-1234-5678'}
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
          </>
        )}
        <S.SubmitButton
          mode="contained"
          disabled={!name || !email || !password || !phoneNumber}
          onPress={async () => {
            if (password !== passwordCheck) {
              Alert.alert('비밀번호가 일치하지 않습니다.');
              return;
            }

            signUp(
              {
                email,
                password,
                name,
                phoneNumber,
              },
              {
                onSuccess: () => {
                  navigation.navigate('Register', {screen: 'Login'});
                },
                onError: error => {
                  Alert.alert(`${error.errorMessage}`);
                },
              },
            );
          }}>
          회원가입
        </S.SubmitButton>
      </S.LoginFormWrapper>
    </S.ScreenWrapper>
  );
};

export default CredentialSignUp;
