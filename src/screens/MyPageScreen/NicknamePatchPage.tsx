import {useQueryClient} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {Alert} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {TextInput, TextInputRef} from '@ummgoban/shared';

import useProfile from '@/hooks/useProfile';

import {usePatchNicknameMutation} from '@/apis/auth';

import {BottomButton, Spacer} from '@/components/common';

import {MyPageStackParamList} from '@/types/StackNavigationType';

import S from './NoticePage.style';

type NicknamePatchScreenProps = StackScreenProps<
  MyPageStackParamList,
  'Nickname'
>;

const NicknamePatchPage = ({navigation}: NicknamePatchScreenProps) => {
  const {profile} = useProfile();
  const [isValid, setIsValid] = useState(false);

  const queryClient = useQueryClient();

  const inputRef = useRef<TextInputRef>(null);

  const {mutate: nicknamePatchMutate} = usePatchNicknameMutation();

  const handleNicknamePatchMutate = (nickname?: string) => {
    if (!nickname) {
      Alert.alert('닉네임을 입력해주세요!');
      return;
    }
    nicknamePatchMutate(nickname, {
      onSuccess: () => {
        Alert.alert('닉네임이 변경되었어요!');
        navigation.goBack();
        queryClient.invalidateQueries({queryKey: ['profile']});
      },
      onError: () => {
        // FIXME: 에러 핸들링
        Alert.alert('닉네인 변경에 실패했어요. 다시 시도해주세요!');
      },
    });
  };

  return (
    <S.Container>
      <TextInput
        ref={inputRef}
        label="변경할 닉네임을 입력해주세요 (3글자 이상)"
        errorMessage="닉네임은 3글자 이상 입력해주세요"
        placeholder={profile?.nickname ?? ''}
        validation={text => text.length > 2}
        autoCapitalize="none"
        full
        onChangeText={text => {
          setIsValid(text.length > 2);
          console.log(text);
        }}
      />
      <Spacer size={16} />

      <BottomButton
        disabled={!isValid}
        onPress={() => {
          handleNicknamePatchMutate(inputRef.current?.value);
        }}>
        닉네임 변경하기
      </BottomButton>
    </S.Container>
  );
};

export default NicknamePatchPage;
