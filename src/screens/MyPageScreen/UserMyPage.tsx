import React from 'react';
import {Alert, RefreshControl} from 'react-native';
import {UserType} from '@/types/UserType';
import {Profile} from '@components/myPage';
import {logout} from '@/apis/Login';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ListBox from '@/components/common/ListBox';
import NavigateTextButton from '@/components/common/NavigateTextButton';
import S from './UserMyPage.style';
import {RootStackParamList} from '@/types/StackNavigationType';

type UserMyPageProps = {
  profile: UserType;
  refreshing: boolean;
  onRefresh: () => void;
};

const UserMyPage = ({profile, refreshing, onRefresh}: UserMyPageProps) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();

  return (
    <S.MyPageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Profile image={profile.image} />
      <ListBox
        items={[
          {label: '이름', value: `${profile.name}`},
          {label: '이메일', value: `test@example.com`},
          {label: '전화번호', value: `010-1234-5678`},
        ]}
      />
      <S.NoticeSection>
        <S.NoticeSectionTitle>문의 및 알림</S.NoticeSectionTitle>
        <S.ButtonRow>
          <NavigateTextButton
            text="공지사항"
            fontSize="20px"
            onPress={() => Alert.alert('공지사항 화면으로 이동')}
          />
          <NavigateTextButton
            text="약관 및 정책"
            fontSize="20px"
            onPress={() => Alert.alert('약관 및 정책 화면으로 이동')}
          />
        </S.ButtonRow>
        <S.ButtonRow>
          <NavigateTextButton
            text="공지사항"
            fontSize="20px"
            onPress={() => Alert.alert('공지사항 화면으로 이동')}
          />
          <NavigateTextButton
            text="약관 및 정책"
            fontSize="20px"
            onPress={() => Alert.alert('약관 및 정책 화면으로 이동')}
          />
        </S.ButtonRow>
      </S.NoticeSection>
      <S.BottomSectionContainer>
        <S.BottomSection>
          <S.ButtonRow>
            <NavigateTextButton
              text="로그아웃"
              fontSize="12px"
              fontColor="#888"
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
            <NavigateTextButton
              text="회원탈퇴"
              fontSize="12px"
              fontColor="#888"
              onPress={() => Alert.alert('회원탈퇴')}
            />
          </S.ButtonRow>
        </S.BottomSection>
      </S.BottomSectionContainer>
    </S.MyPageContainer>
  );
};

export default UserMyPage;
