import React from 'react';
import S from './HeaderTitle.style';

type HeaderTitleProps = {
  title: string;
};

const HeaderTitle = ({title}: HeaderTitleProps) => {
  return (
    <S.LogoContainer>
      <S.TitleText>{title}</S.TitleText>
    </S.LogoContainer>
  );
};

export default HeaderTitle;
