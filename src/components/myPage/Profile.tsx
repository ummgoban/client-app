import React from 'react';

import S from './Profile.style';

const Profile = ({image}: {image?: string}) => {
  return (
    <S.ProfileContainer>
      <S.ProfileImage
        source={{
          uri:
            image ||
            // TODO: 이미지 경로 수정
            'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
        }}
      />
    </S.ProfileContainer>
  );
};

export default Profile;
