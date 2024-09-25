import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import S from './MarketImageSlider.style';

const MarketImageSlider = () => {
  const screenWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const images = [
    'https://legacy.reactjs.org/logo-og.png',
    'https://legacy.reactjs.org/logo-og.png',
    'https://legacy.reactjs.org/logo-og.png',
  ];

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);

    scrollViewRef.current?.scrollTo({
      x: newIndex * screenWidth,
      animated: true,
    });
  };

  return (
    <View>
      <S.MarketImageScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onMomentumScrollEnd={handleScrollEnd}>
        {images.map((image, index) => (
          <S.MarketImageContainer key={index} screenWidth={screenWidth}>
            <S.MarketImage source={{uri: image}} screenWidth={screenWidth} />
          </S.MarketImageContainer>
        ))}
      </S.MarketImageScrollView>

      <S.IndexView>
        <S.IndexText>{`${currentIndex + 1} / ${images.length}`}</S.IndexText>
      </S.IndexView>
    </View>
  );
};

export default MarketImageSlider;
