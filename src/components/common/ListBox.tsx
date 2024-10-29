import React from 'react';
import S from './ListBox.style';
import NavigateNoticeTextButton from './NavigateNoticeTextButton';
import NavigateTextButton from './NavigateTextButton';
type ListBoxItemProps = {
  label: string;
  value: string;
  onPress?: () => void;
};

type ListBoxProps = {
  items: ListBoxItemProps[];
};

const ListBox = ({items}: ListBoxProps) => {
  return (
    <S.ListWrapper>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <S.ListItem key={index} isFirst={isFirst} isLast={isLast}>
            <S.ItemLabel>{item.label}</S.ItemLabel>
            {item.value &&
              (item.onPress ? (
                <NavigateNoticeTextButton
                  text={item.value}
                  onPress={item.onPress}
                  fontColor="#888"
                  fontSize="16px"
                  iconSize={20}
                />
              ) : (
                <NavigateTextButton
                  text={item.value}
                  fontColor="#888"
                  fontSize="16px"
                />
              ))}
          </S.ListItem>
        );
      })}
    </S.ListWrapper>
  );
};

export default ListBox;
