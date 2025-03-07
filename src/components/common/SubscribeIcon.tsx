import {useMarketLike} from '@/apis/markets';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
  const queryClient = useQueryClient();

  const {mutateAsync: updateMarketLike} = useMarketLike(marketId);

  const handleLikePress = async () => {
    if (marketId !== undefined) {
      const response = await updateMarketLike();
      if (response) {
        handleSubscribe();
        queryClient.invalidateQueries({queryKey: ['subscribeList']});
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
