import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CommonResponseType} from '@/apis/CommonResponseType';
import apiClient from '@/apis/ApiClient';

type SubscribeIconProps = {
  marketIsLiked: boolean;
  marketId?: number;
  handleSubscribe: () => void;
};

const SubscribeIcon = ({
  marketIsLiked,
  marketId,
  handleSubscribe,
}: SubscribeIconProps) => {
  const handleLikePress = async () => {
    try {
      let res;
      if (marketIsLiked) {
        console.log('DEL');
        res = await apiClient.del<CommonResponseType | null>(
          `/market/${marketId}/like`,
        );
      } else {
        console.log('POST');
        res = await apiClient.post<CommonResponseType | null>(
          `/market/${marketId}/like`,
        );
      }
      handleSubscribe();
      return res;
    } catch (error) {
      console.error('Error subscribe', error);
      return null;
    }
  };

  return (
    <TouchableOpacity onPress={handleLikePress}>
      <Icon name={marketIsLiked ? 'heart' : 'hearto'} size={24} />
    </TouchableOpacity>
  );
};

export default SubscribeIcon;
