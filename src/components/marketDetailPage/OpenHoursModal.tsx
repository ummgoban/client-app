import React from 'react';
import {Modal} from 'react-native';
import ChevronIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import S from './OpenHoursModal.style';

const dayMap: Record<string, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

type MarketOpenHourType = {
  dayOfWeek: keyof typeof dayMap;
  openTime: string;
  closeTime: string;
};

type MarketOpenHourModalProps = {
  visible: boolean;
  onClose: () => void;
  openHours: MarketOpenHourType[];
};

const MarketOpenHourModal = ({
  visible,
  onClose,
  openHours,
}: MarketOpenHourModalProps) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade">
      <S.ModalOverlay>
        <S.ModalContent>
          <S.ModalHeader>
            <S.ModalHeaderText>영업시간</S.ModalHeaderText>
            <S.CloseButton onPress={onClose}>
              <ChevronIcon name="close" size={24} color="#495057" />
            </S.CloseButton>
          </S.ModalHeader>

          <S.HourList>
            {openHours.map(({dayOfWeek, openTime, closeTime}) => (
              <S.HourItem key={dayOfWeek}>
                <S.HourText>
                  {dayMap[dayOfWeek]}요일 {openTime} - {closeTime}
                </S.HourText>
              </S.HourItem>
            ))}
          </S.HourList>
        </S.ModalContent>
      </S.ModalOverlay>
    </Modal>
  );
};

export default MarketOpenHourModal;
