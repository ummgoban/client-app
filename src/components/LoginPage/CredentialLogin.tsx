import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import useProfile from '@/hooks/useProfile';

import TextInput from '../common/TextInput/TextInput';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './CredentialLogin.style';

const CredentialLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, loading} = useProfile();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <S.Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.LoginFormWrapper>
          <TextInput
            placeholder={'이메일'}
            value={email}
            onChange={e => setEmail(e.nativeEvent.text)}
          />
          <TextInput
            placeholder={'비밀번호'}
            value={password}
            onChange={e => setPassword(e.nativeEvent.text)}
            secureTextEntry
          />
          <S.SubmitButton
            mode="contained"
            disabled={!email || !password || loading}
            onPress={async () => {
              login(
                {email, password},
                {
                  onSuccess: () =>
                    navigation.navigate('Home', {screen: 'Feed'}),
                  onError: error => Alert.alert(`${error.errorMessage}`),
                },
              );
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
      </TouchableWithoutFeedback>
    </S.Container>
  );
};

export default CredentialLogin;
