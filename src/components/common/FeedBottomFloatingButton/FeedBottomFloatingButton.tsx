import React from 'react';

import S from './FeedBottomFloatingButton.style';

type FeedBottomFloatingButtonProps = {
  onPress: () => void;
  Icon: React.ReactNode;
  label: string;
};

const FeedBottomFloatingButton = ({
  onPress,
  Icon,
  label,
}: FeedBottomFloatingButtonProps) => {
  return (
    <S.FloatingButtonContainer>
      <S.FloatingButton onPress={onPress}>
        <S.IconWrapper>{Icon}</S.IconWrapper>
        <S.FloatingButtonText>{label}</S.FloatingButtonText>
      </S.FloatingButton>
    </S.FloatingButtonContainer>
  );
};

export default FeedBottomFloatingButton;
