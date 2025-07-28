import React, {useState} from 'react';
import RatingStars from '@/components/reviewCreate/RatingStarts';
import S from './ReviewCreateScreen.style';
import {StackScreenProps} from '@react-navigation/stack';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@/components/common';
import TextInput from '@/components/common/TextInput/TextInput';
import UploadedPicture from '@/components/reviewCreate/UplodedPicture';
import {
  useCreateReviewMutation,
  useUploadReviewImageMutation,
} from '@/apis/review';
import {pickImage} from '@/utils/image-picker';
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import CustomActivityIndicator from '@/components/common/ActivityIndicator';

type ReviewCreateScreenProps = StackScreenProps<
  DetailStackParamList,
  'ReviewCreate'
>;

const ReviewCreateScreen = ({navigation, route}: ReviewCreateScreenProps) => {
  const {orderId, reviewContents, marketName, marketId} = route.params;
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>('');
  const [reviewImageUris, setReviewImageUris] = useState<string[]>([]);
  const [isReviewUploading, setisReviewUploading] = useState<boolean>(false);

  const {mutateAsync: reviewImageUploadMutate} = useUploadReviewImageMutation();
  const {mutate: reviewCreateMutate} = useCreateReviewMutation(orderId);

  const handleImageUpload = async () => {
    const res = await pickImage();
    if (!res) {
      console.error('pickImage Error: no image');
      Alert.alert('이미지를 불러오지 못했습니다.');
      return;
    }
    setReviewImageUris(prev => [...prev, res]);
  };

  const handleReviewCreateMutate = async () => {
    try {
      setisReviewUploading(true);

      const uploadedUrls: string[] = [];

      for (const uri of reviewImageUris) {
        const formdata = new FormData();
        formdata.append('updateImage', {
          name: uri.split('/').pop(),
          type: `image/jpeg`,
          uri,
        });

        const s3Url = await reviewImageUploadMutate({
          marketId,
          uploadImage: formdata,
        });

        if (!s3Url) {
          Alert.alert('이미지 업로드에 실패했습니다.');
          return;
        }
        uploadedUrls.push(s3Url);
      }

      reviewCreateMutate(
        {rating, imageUrls: uploadedUrls, content: review},
        {
          onSuccess: () => {
            Alert.alert('리뷰 작성이 완료되었어요!');
            navigation.navigate('Home', {screen: 'Feed'});
          },
          onError: () => {
            Alert.alert('리뷰 작성에 실패했어요. 다시 시도해주세요!');
          },
        },
      );
    } catch (e) {
      console.error('리뷰 작성 실패:', e);
      Alert.alert('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      setisReviewUploading(false);
    }
  };
  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isReviewUploading && <CustomActivityIndicator />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <S.ReviewCreateScreenContainer>
            <S.ReviewRequestTextContainer>
              <S.ReviewRequsetText>
                주문에 대한 리뷰를 작성해주세요!
              </S.ReviewRequsetText>
            </S.ReviewRequestTextContainer>
            <S.MarketName>{marketName}</S.MarketName>
            <S.ReviewContentContainer>
              <S.ContentInformationText>주문 정보 </S.ContentInformationText>
              {reviewContents.map(content => (
                <S.TextRowWrapper key={`${orderId}-${content.id}`}>
                  <S.ContentDescription>
                    {content.name} {content.count}개
                  </S.ContentDescription>
                  <S.ContentDescription>
                    {(content.discountPrice * content.count).toLocaleString()}원
                  </S.ContentDescription>
                </S.TextRowWrapper>
              ))}
            </S.ReviewContentContainer>
            <S.ReviewInputContainer>
              <RatingStars rating={rating} setRating={setRating} />
              <TextInput
                placeholder="반찬에 대한 리뷰를 남겨주세요!"
                value={review}
                onChange={e => setReview(e.nativeEvent.text)}
              />
              <UploadedPicture
                imageUrls={reviewImageUris}
                setImageUrls={handleImageUpload}
              />
            </S.ReviewInputContainer>
            <BottomButton
              disabled={!review || review.length === 0 || isReviewUploading}
              onPress={handleReviewCreateMutate}>
              리뷰 작성하기
            </BottomButton>
          </S.ReviewCreateScreenContainer>
        </>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};

export default ReviewCreateScreen;
