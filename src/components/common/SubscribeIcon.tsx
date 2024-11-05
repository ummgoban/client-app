import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {updateMarketLike} from '@/apis';

type SubscribeIconProps = {
  marketIsLiked: boolean;
  marketId?: string;
  handleSubscribe: () => void;
};

const SubscribeIcon = ({
  marketIsLiked,
  marketId,
  handleSubscribe,
}: SubscribeIconProps) => {
  const handleLikePress = async () => {
    if (marketId !== undefined) {
      const response = await updateMarketLike(marketId, marketIsLiked);
      if (response) {
        handleSubscribe();
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleLikePress}>
      <Icon name={marketIsLiked ? 'heart' : 'hearto'} size={24} />
    </TouchableOpacity>
  );
};

export default SubscribeIcon;
