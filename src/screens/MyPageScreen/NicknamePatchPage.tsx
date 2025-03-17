import React, {useState} from 'react';

import S from './NoticePage.style';
import useProfile from '@/hooks/useProfile';
import TextInput from '@/components/common/TextInput/TextInput';
import {usePatchNicknameMutation} from '@/apis/auth';
import {Alert} from 'react-native';
import {BottomButton} from '@/components/common';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '@/types/StackNavigationType';
import {useQueryClient} from '@tanstack/react-query';

type NicknamePatchScreenProps = StackScreenProps<
  MyPageStackParamList,
  'Nickname'
>;

const NicknamePatchPage = ({navigation}: NicknamePatchScreenProps) => {
  const {profile} = useProfile();
  const queryClient = useQueryClient();
  const [inputNickname, setInputNickname] = useState<string>('');
  const {mutate: nicknamePatchMutate} = usePatchNicknameMutation();

  const handleNicknamePatchMutate = (nickname: string) => {
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
        label="변경할 닉네임을 입력해주세요!"
        placeholder={profile?.nickname ?? ''}
        value={inputNickname}
        onChange={e => setInputNickname(e.nativeEvent.text)}
      />
      <BottomButton
        disabled={!inputNickname}
        onPress={() => {
          handleNicknamePatchMutate(inputNickname);
        }}>
        닉네임 변경하기
      </BottomButton>
    </S.Container>
  );
};

export default NicknamePatchPage;
