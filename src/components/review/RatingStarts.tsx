import React from 'react';
import {TouchableOpacity} from 'react-native';
import S from './RaitingStarts.style';
import Icon from 'react-native-vector-icons/AntDesign';

type RatingStarsProps = {
  rating: number;
  setRating: (rating: number) => void;
};

const RatingStars = ({rating, setRating}: RatingStarsProps) => {
  return (
    <S.Container>
      {[1, 2, 3, 4, 5].map(value => (
        <TouchableOpacity key={value} onPress={() => setRating(value)}>
          <Icon
            name={value <= rating ? 'star' : 'staro'}
            size={48}
            color="#FFD700"
          />
        </TouchableOpacity>
      ))}
    </S.Container>
  );
};

export default RatingStars;
