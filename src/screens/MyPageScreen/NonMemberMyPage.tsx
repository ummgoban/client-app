import React from 'react';

import S from './NonMemberMyPage.style';

const NonMemberMyPage = ({onPress}: {onPress: () => void}) => {
  return (
    <S.Container>
      <S.Description>
        {'로그인 후 판매 중인 반찬을 예약해보세요.'}
      </S.Description>
      <S.LoginButton onPress={onPress}>
        {'로그인 및 회원가입하기'}
      </S.LoginButton>
    </S.Container>
  );
};

export default NonMemberMyPage;
