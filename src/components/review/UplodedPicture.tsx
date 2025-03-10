import React from 'react';
import S from './UploadedPicture.style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

type UploadedPictureProps = {
  imageUrls?: string[];
  setImageUrls: () => void;
};

const UploadedPicture = ({imageUrls, setImageUrls}: UploadedPictureProps) => {
  return (
    <S.Container
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}>
      <S.ImageUploadButton onPress={setImageUrls}>
        <Icon name={'camera'} size={40} />
        <S.ImageUploadText>사진 {imageUrls?.length ?? 0}/5</S.ImageUploadText>
      </S.ImageUploadButton>
      {imageUrls &&
        imageUrls.length > 0 &&
        imageUrls.map(url => (
          <S.UploadedImageWrapper key={url}>
            <S.UploadedImage source={{uri: url}} resizeMode="cover" />
          </S.UploadedImageWrapper>
        ))}
    </S.Container>
  );
};

export default UploadedPicture;
