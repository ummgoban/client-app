import styled from '@emotion/native';

const ProfileScrollWrapper = styled.ScrollView``;

const ProfileContainer = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImage = styled.Image`
  width: 82px;
  height: 82px;

  border-radius: 41px;
`;

const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
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
  ProfileScrollWrapper,
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  LinkLayout,
  LinkContainer,
  Link,
  LinkText,
};

export default S;
