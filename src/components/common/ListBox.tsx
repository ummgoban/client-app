import React from 'react';
import S from './ListBox.style';
import NavigationTextButton from './NavigateTextButton';

type ListBoxProps = {
  items: {
    label: string;
    value?: string;
    onPress?: () => void;
  }[];
};

const ListBox = ({items}: ListBoxProps) => {
  return (
    <S.ListWrapper>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <S.ListItem
            key={`${index}-${item.label}`}
            isFirst={isFirst}
            isLast={isLast}>
            <S.ItemLabel>{item.label}</S.ItemLabel>
            {item.onPress ? (
              <NavigationTextButton
                text={item.value ? item.value : ''}
                onPress={item.onPress}
                fontColor="#888"
                fontSize="16px"
                iconSize={20}
              />
            ) : (
              <NavigationTextButton
                text={item.value ? item.value : ''}
                fontColor="#888"
                fontSize="16px"
                isNotice={false}
              />
            )}
          </S.ListItem>
        );
      })}
    </S.ListWrapper>
  );
};

export default ListBox;
