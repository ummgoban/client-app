import styled from '@emotion/native';

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const S = {ProfileContainer, ProfileImage, ProfileInfo};

export default S;
