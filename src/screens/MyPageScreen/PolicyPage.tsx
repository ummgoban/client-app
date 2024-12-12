import React from 'react';

import S from './NoticePage.style';

const PolicyPage = () => {
  return (
    <S.Container>
      <S.NoticeCard>
        <S.NoticeCardContent>
          <S.Title>{'약관 및 정책'}</S.Title>
          <S.Description>
            {'맘찬픽 어플리케이션 테스트에 참여해주셔서 감사합니다.'}
          </S.Description>
        </S.NoticeCardContent>
      </S.NoticeCard>
    </S.Container>
  );
};

export default PolicyPage;
