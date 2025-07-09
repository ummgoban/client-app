import React, {useRef} from 'react';
import {Alert} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

import {StackScreenProps} from '@react-navigation/stack';
import {TextInputRef} from '@ummgoban/shared';

import useProfile from '@/hooks/useProfile';

import {usePatchNicknameMutation} from '@/apis/auth';

import {BottomButton} from '@/components/common';

import {MyPageStackParamList} from '@/types/StackNavigationType';

import S from './NoticePage.style';
import {NickNameTextInput} from './NicknamePatchPage.style';

type NicknamePatchScreenProps = StackScreenProps<
  MyPageStackParamList,
  'Nickname'
>;

const NicknamePatchPage = ({navigation}: NicknamePatchScreenProps) => {
  const {profile} = useProfile();
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
      <NickNameTextInput
        ref={inputRef}
        label="변경할 닉네임을 입력해주세요!"
        full
        TextInputProps={{
          placeholder: profile?.nickname ?? '',
        }}
      />
      <BottomButton
        disabled={!inputRef.current?.value}
        onPress={() => {
          handleNicknamePatchMutate(inputRef.current?.value);
        }}>
        닉네임 변경하기
      </BottomButton>
    </S.Container>
  );
};

export default NicknamePatchPage;
