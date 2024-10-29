import styled from '@emotion/native';

const MyPageContainer = styled.ScrollView`
  margin: 32px 16px;
`;

const ProfileImageSection = styled.View`
  margin-bottom: 32px;
`;

const NoticeSection = styled.View`
  display: flex;
  margin: 48px 16px;
  width: 75%;
  gap: 8px;
`;

const NoticeSectionTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #888;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const VerticalDivider = styled.View`
  border: 1px solid #888;
`;

const BottomSectionContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BottomSection = styled.View`
  width: 40%;
`;
const S = {
  MyPageContainer,
  NoticeSectionTitle,
  ButtonContainer,
  NoticeSection,
  VerticalDivider,
  BottomSectionContainer,
  BottomSection,
  ProfileImageSection,
};

export default S;
