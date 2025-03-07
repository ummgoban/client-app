import React from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import HomeIcon from '@/assets/icons/home-regular.svg';
import HeartIcon from '@/assets/icons/heart-regular.svg';
import RecipeIcon from '@/assets/icons/file-regular.svg';
import ProfileIcon from '@/assets/icons/user-profile-regular.svg';

import {HomeStackParamList} from '@/types/StackNavigationType';

import S from './TabBar.style';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TabBarComponentType = {
  [route in keyof HomeStackParamList]: {
    label: string;
  };
};

const tabBarData: TabBarComponentType = {
  Feed: {
    label: '홈',
  },
  Subscribe: {
    label: '찜',
  },
  MyPage: {
    label: '마이',
  },
  OrderHistory: {
    label: '주문 내역',
  },
};

// TODO: resolve inline style
const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <S.TabBarContainer
      // TODO: lint warning fix
      style={{paddingBottom: insets.bottom, backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const {label} = tabBarData[route.name];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <S.TabBarItemButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <S.TabBarItem>
              {route.name === 'Feed' && (
                <HomeIcon
                  color={
                    isFocused
                      ? 'rgba(22, 190, 83, 1)'
                      : 'rgba(174, 174, 174, 1)'
                  }
                />
              )}
              {route.name === 'Subscribe' && (
                <HeartIcon
                  color={
                    isFocused
                      ? 'rgba(22, 190, 83, 1)'
                      : 'rgba(174, 174, 174, 1)'
                  }
                />
              )}
              {route.name === 'MyPage' && (
                <ProfileIcon
                  color={
                    isFocused
                      ? 'rgba(22, 190, 83, 1)'
                      : 'rgba(174, 174, 174, 1)'
                  }
                />
              )}
              {route.name === 'OrderHistory' && (
                <RecipeIcon
                  color={
                    isFocused
                      ? 'rgba(22, 190, 83, 1)'
                      : 'rgba(174, 174, 174, 1)'
                  }
                />
              )}
              <S.TabBarText isFocused={isFocused}>{label}</S.TabBarText>
            </S.TabBarItem>
          </S.TabBarItemButton>
        );
      })}
    </S.TabBarContainer>
  );
};

export default TabBar;
