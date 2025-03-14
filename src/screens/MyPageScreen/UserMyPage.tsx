import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, RefreshControl} from 'react-native';

import ListBox from '@/components/common/ListBox';
import NavigationTextButton from '@/components/common/NavigateTextButton';
import {Profile} from '@components/myPage';

import useProfile from '@/hooks/useProfile';

import {RootStackParamList} from '@/types/StackNavigationType';
import {UserType} from '@/types/UserType';

import {convertOAuthProviderToKorean} from '@/utils/common';

import theme from '@/context/theme';
import {Portal} from 'react-native-paper';
import S from './UserMyPage.style';

type UserMyPageProps = {
  profile: UserType;
  refreshing: boolean;
  onRefresh: () => void;
};

const UserMyPage = ({profile, refreshing, onRefresh}: UserMyPageProps) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();

  const [isOpen, setIsOpen] = useState(false);

  const {logout, withdraw} = useProfile();

  return (
    <S.MyPageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <S.ProfileImageSection>
        <Profile image={profile.image} />
      </S.ProfileImageSection>
      <ListBox
        items={[
          {
            label: '이름',
            value: `${profile.name}`,
          },
          {
            label: '이메일',
            value: profile.email ?? '이메일 미등록',
          },
          {label: '전화번호', value: profile.phoneNumber ?? '전화번호 미등록'},
          {
            label: '소셜 로그인',
            value: convertOAuthProviderToKorean(profile.provider),
          },
          {
            label: '내가 쓴 리뷰',
            onPress: () =>
              navigation.navigate('Detail', {
                screen: 'CustomerReview',
                params: {memberId: profile.id},
              }),
          },
        ]}
      />
      <S.NoticeSection>
        <S.NoticeSectionTitle>문의 및 알림</S.NoticeSectionTitle>
        <S.ButtonContainer>
          <NavigationTextButton
            text="공지사항"
            fontSize="20px"
            onPress={() =>
              navigation.navigate('MyPageRoot', {screen: 'Notice'})
            }
            isNotice={false}
          />
          <NavigationTextButton
            text="약관 및 정책"
            fontSize="20px"
            onPress={() =>
              navigation.navigate('MyPageRoot', {screen: 'Policy'})
            }
            isNotice={false}
          />
        </S.ButtonContainer>
      </S.NoticeSection>
      <S.BottomSectionContainer>
        <S.BottomSection>
          <S.ButtonContainer>
            <NavigationTextButton
              text="로그아웃"
              fontSize="12px"
              fontColor="#888"
              isNotice={false}
              onPress={() => {
                logout({
                  onSuccess: () => {
                    Alert.alert('로그아웃 되었습니다.', '', [
                      {
                        text: '확인',
                        onPress: () => {
                          navigation.navigate('Home', {screen: 'Feed'});
                        },
                      },
                    ]);
                  },
                });
              }}
            />
            <S.VerticalDivider />
            <NavigationTextButton
              text="회원탈퇴"
              fontSize="12px"
              fontColor="#888"
              isNotice={false}
              onPress={() => setIsOpen(true)}
            />
          </S.ButtonContainer>
        </S.BottomSection>
      </S.BottomSectionContainer>
      <Portal>
        <S.WithdrawModal visible={isOpen} onDismiss={() => setIsOpen(false)}>
          <S.WithdrawModalContainer>
            <S.WithdrawModalContent>
              {'회원 탈퇴 시 저장되어 있는 모든 정보가 사라져요.\n'}

              {'계속 탈퇴하시겠어요?'}
            </S.WithdrawModalContent>
            <S.WithdrawModalActionContainer>
              <S.WithdrawModalCancelButton
                onPress={() => setIsOpen(false)}
                textColor={theme.colors.primary}>
                취소
              </S.WithdrawModalCancelButton>
              <S.WithdrawModalConfirmButton
                textColor={theme.colors.dark}
                onPress={() =>
                  Alert.alert(
                    '정말로 회원 탈퇴하시나요?',
                    '회원 탈퇴 시 저장되어 있는 모든 정보가 사라져요.',
                    [
                      {
                        text: '취소',
                        onPress: () => setIsOpen(false),
                      },
                      {
                        text: '탈퇴하기',
                        onPress: () => {
                          withdraw({
                            onSuccess: () => {
                              navigation.navigate('Home', {screen: 'Feed'});
                            },
                            onError: error => {
                              Alert.alert(
                                '탈퇴 중에 오류가 발생해요.',
                                error.errorMessage,
                                [
                                  {
                                    text: '확인',
                                    onPress: () => setIsOpen(false),
                                  },
                                ],
                              );
                            },
                          });
                        },
                      },
                    ],
                  )
                }>
                탈퇴하기
              </S.WithdrawModalConfirmButton>
            </S.WithdrawModalActionContainer>
          </S.WithdrawModalContainer>
        </S.WithdrawModal>
      </Portal>
    </S.MyPageContainer>
  );
};

export default UserMyPage;
