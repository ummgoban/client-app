import {useMarketLike} from '@/apis/markets';
import useProfile from '@/hooks/useProfile';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';

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
  const {profile} = useProfile();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  const navigateLoginScreen = () => {
    Alert.alert('로그인 후 가게를 찜해보세요!', '', [
      {
        text: '확인',
        onPress: () => {
          navigation.navigate('Register', {screen: 'Login'});
        },
      },
      {
        text: '취소',
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={profile ? handleLikePress : navigateLoginScreen}>
      <Icon
        name={marketIsLiked ? 'heart' : 'hearto'}
        size={24}
        color="#FF4033"
      />
    </TouchableOpacity>
  );
};

export default SubscribeIcon;
