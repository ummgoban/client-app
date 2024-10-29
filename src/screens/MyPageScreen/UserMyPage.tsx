import React from 'react';
import {Alert, RefreshControl} from 'react-native';
import {UserType} from '@/types/UserType';
import {Profile} from '@components/myPage';
import {logout} from '@/apis/Login';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ListBox from '@/components/common/ListBox';
import S from './UserMyPage.style';
import {RootStackParamList} from '@/types/StackNavigationType';
import NavigationTextButton from '@/components/common/NavigateTextButton';

type UserMyPageProps = {
  profile: UserType;
  refreshing: boolean;
  onRefresh: () => void;
};

const UserMyPage = ({profile, refreshing, onRefresh}: UserMyPageProps) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();

  // TODO: 실제 navigate 적용
  const handlePress = () => {
    Alert.alert('실제 navigate 로직 적용 필요');
  };

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
            value: `test@example.com`,
          },
          {label: '전화번호', value: `010-1234-5678`},
        ]}
      />
      <S.NoticeSection>
        <S.NoticeSectionTitle>문의 및 알림</S.NoticeSectionTitle>
        <S.ButtonContainer>
          <NavigationTextButton
            text="공지사항"
            fontSize="20px"
            onPress={handlePress}
            isNotice={false}
          />
          <NavigationTextButton
            text="약관 및 정책"
            fontSize="20px"
            onPress={handlePress}
            isNotice={false}
          />
        </S.ButtonContainer>
        <S.ButtonContainer>
          <NavigationTextButton
            text="공지사항"
            fontSize="20px"
            onPress={handlePress}
            isNotice={false}
          />
          <NavigationTextButton
            text="약관 및 정책"
            fontSize="20px"
            onPress={handlePress}
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
              onPress={async () => {
                const res = await logout();
                if (res) {
                  Alert.alert('로그아웃 되었습니다.', '', [
                    {
                      text: '확인',
                      onPress: () => {
                        navigation.navigate('Home', {screen: 'Feed'});
                      },
                    },
                  ]);
                }
              }}
            />
            <S.VerticalDivider />
            {/* TODO: 회원탈퇴 로직 적용 */}
            <NavigationTextButton
              text="회원탈퇴"
              fontSize="12px"
              fontColor="#888"
              isNotice={false}
              onPress={() => Alert.alert('회원탈퇴')}
            />
          </S.ButtonContainer>
        </S.BottomSection>
      </S.BottomSectionContainer>
    </S.MyPageContainer>
  );
};

export default UserMyPage;
