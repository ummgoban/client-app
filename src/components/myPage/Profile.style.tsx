import styled from '@emotion/native';

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;

  margin: 24px 24px 0;
`;

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;

  border-radius: 32px;
`;

const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkLayout = styled.View`
  display: flex;
  flex-direction: row;

  gap: 8px;

  align-items: flex-start;
`;

const LinkContainer = styled.View`
  height: 24px;

  padding: 2px 10px;
`;
const Link = styled.TouchableOpacity``;

const LinkText = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

const S = {
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  LinkLayout,
  LinkContainer,
  Link,
  LinkText,
};

export default S;
