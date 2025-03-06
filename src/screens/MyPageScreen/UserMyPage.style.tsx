import styled from '@emotion/native';
import {Button, Modal, Text} from 'react-native-paper';

const S = {
  MyPageContainer: styled.ScrollView`
    padding: 32px 16px;
  `,

  ProfileImageSection: styled.View`
    margin-bottom: 32px;
  `,

  NoticeSection: styled.View`
    display: flex;
    margin: 48px 16px;
    width: 75%;
    gap: 8px;
  `,

  NoticeSectionTitle: styled.Text`
    font-size: 16px;
    margin-bottom: 8px;
    color: #888;
  `,

  ButtonContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
  `,

  VerticalDivider: styled.View`
    border: 1px solid #888;
  `,

  BottomSectionContainer: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,

  BottomSection: styled.View`
    width: 40%;
  `,

  WithdrawModal: styled(Modal)``,
  WithdrawModalContainer: styled.View`
    display: flex;
    flex-direction: column;

    gap: 8px;

    background-color: white;

    padding: 16px;
    margin: 0 16px;
  `,
  WithdrawModalContent: styled(Text)`
    ${({theme}) => theme.fonts.labelLarge}

    text-align: center;
  `,
  WithdrawModalActionContainer: styled.View`
    display: flex;
    flex-direction: row;

    justify-content: flex-end;

    gap: 8px;
  `,
  WithdrawModalConfirmButton: styled(Button)``,
  WithdrawModalCancelButton: styled(Button)``,
};

export default S;
