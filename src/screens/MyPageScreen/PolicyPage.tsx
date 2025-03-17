import React from 'react';
import {ScrollView} from 'react-native';

import S from './NoticePage.style';

const termsOfService = `
이용약관 (Terms of Service)

1. 수집 목적
맘찬픽(이하 “회사”)은 제공하는 서비스 이용과 관련하여 회사와 사용자 간의 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.

2. 서비스 이용
- 사용자는 본 약관에 동의하는 경우에만 서비스를 이용할 수 있습니다.
- 회사는 서비스의 일부 또는 전체를 변경할 수 있습니다.

3. 사용자 의무
사용자는 다음 사항을 준수해야 합니다:
- 정확한 정보 제공
- 타인의 권리를 침해하지 않음
- 불법 행위를 하지 않음

4. 서비스 제공 및 변경
- 회사는 서비스를 안정적으로 제공하기 위해 노력하나, 다음과 같은 경우 서비스 제공이 제한될 수 있습니다:
  - 정기/비정기적인 유지보수
  - 기술적 문제 발생
  - 불가항력적인 상황 (천재지변, 법적 조치 등)

5. 계정 관리
- 사용자는 자신의 계정 정보 보호에 대한 책임이 있습니다.
- 계정 도용이나 보안 문제가 발생한 경우 즉시 회사에 알립니다.
`;

const privacyPolicy = `
개인정보 처리방침 (Privacy Policy)

1. 개인정보의 처리 목적과 수집 항목
회사는 다음의 목적을 위하여 최소한의 개인정보만을 수집하고 처리합니다.

- 본인 확인 및 인증, 회원가입 및 로그인 관리
- 고객과 가게 간 서비스 제공을 위한 소통 및 정보 제공
- 주문 내역 관리, 픽업 서비스 안내
- 서비스 개선 및 신규 서비스 개발을 위한 분석 및 통계
- 고객 문의 및 불만 처리, 서비스 이용에 따른 민원 해결

2. 수집 항목
- 필수: 이름, 이메일 주소(소셜로그인 시 제공받는 이메일 포함), 소셜로그인 식별자
- 선택: 전화번호, 프로필 사진, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 위치정보(이용자 동의 시)

3. 개인정보의 보유 및 이용 기간
- 회원가입 및 관리: 회원 탈퇴 시까지
- 법령에 따른 보존: 소비자 보호법에 따라 일부 데이터 보관

4. 개인정보 보호책임자
- 이름: 김영민
- 이메일: momchanpick@gmail.com
`;

const PolicyPage = () => {
  return (
    <S.Container>
      <ScrollView>
        <S.NoticeCard>
          <S.NoticeCardContent>
            <S.Title>{'이용약관'}</S.Title>
            <S.Description>{termsOfService}</S.Description>
          </S.NoticeCardContent>
        </S.NoticeCard>

        <S.NoticeCard>
          <S.NoticeCardContent>
            <S.Title>{'개인정보 처리방침'}</S.Title>
            <S.Description>{privacyPolicy}</S.Description>
          </S.NoticeCardContent>
        </S.NoticeCard>
      </ScrollView>
    </S.Container>
  );
};

export default PolicyPage;
