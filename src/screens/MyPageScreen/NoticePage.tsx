import React from 'react';

import S from './NoticePage.style';

const NoticePage = () => {
  return (
    <S.Container>
      <S.NoticeCard>
        <S.NoticeCardContent>
          <S.Title>{'맘찬픽 어플리케이션 0.1.0 테스트'}</S.Title>
          <S.Description>
            {'맘찬픽 어플리케이션 테스트 참여해주셔서 감사합니다.'}
          </S.Description>
        </S.NoticeCardContent>
      </S.NoticeCard>
    </S.Container>
  );
};

export default NoticePage;
