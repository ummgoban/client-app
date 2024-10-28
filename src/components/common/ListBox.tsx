import React from 'react';
import S from './ListBox.style';
import NavigateNoticeTextButton from './NavigateNoticeTextButton';
import {Alert} from 'react-native';
type ListBoxItemProps = {
  label: string;
  value?: string;
};

type ListBoxProps = {
  items: ListBoxItemProps[];
};

const ListBox = ({items}: ListBoxProps) => {
  const handlePress = () => {
    // TODO: 변경 목록 확정 필요
    Alert.alert('TODO 변경 목록 확정이후 변경');
  };
  return (
    <S.ListWrapper>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <S.ListItem key={index} isFirst={isFirst} isLast={isLast}>
            <S.ItemLabel>{item.label}</S.ItemLabel>
            {item.value && (
              <NavigateNoticeTextButton
                text={item.value}
                onPress={handlePress}
                fontColor="#888"
                fontSize="16px"
              />
            )}
          </S.ListItem>
        );
      })}
    </S.ListWrapper>
  );
};

export default ListBox;
