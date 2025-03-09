import React from 'react';
import S from './UploadedPicture.style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Image} from 'react-native';
import {useReadReviewListForMarket} from '@/apis/review';

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
          <S.UploadedImage key={url}>
            <Image
              source={{uri: url}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </S.UploadedImage>
        ))}
    </S.Container>
  );
};

export default UploadedPicture;
