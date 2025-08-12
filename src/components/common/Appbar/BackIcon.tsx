import React from 'react';
import styled from '@emotion/native';

import {useWebViewHistoryStore} from '@/webview';

import ChevronLeft from '@/assets/icons/chevron-left.svg';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useNavigation} from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

const S = {
  Container: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    padding: 8px;
  `,
  Icon: styled(ChevronLeft)`
    width: 24px;
    height: 24px;
  `,
};

export const BackIcon: StackNavigationOptions['headerLeft'] = ({
  tintColor,
  canGoBack,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {history, setHistory} = useWebViewHistoryStore();

  if (!canGoBack && !history) {
    return undefined;
  }

  return (
    <S.Container>
      <S.Icon
        color={tintColor}
        width={24}
        height={24}
        onPress={() => {
          setHistory(undefined);
          if (history) {
            navigation.navigate(history.screen, {
              screen: history.screen,
              params: history.params,
              webview: {
                uri: history.webUri,
              },
            });
            return;
          }
          navigation.goBack();
        }}
      />
    </S.Container>
  );
};
