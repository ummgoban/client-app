import React from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {default as AntIcon} from 'react-native-vector-icons/AntDesign';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';

import {HomeStackParamList} from '@/types/StackNavigationType';

import S from './TabBar.style';

type TabBarComponentType = {
  [route in keyof HomeStackParamList]: {
    label: string;
    icon: {
      family: 'AntDesign' | 'Feather';
      name: string;
    };
  };
};

const tabBarData: TabBarComponentType = {
  Feed: {
    label: '홈',
    icon: {
      family: 'Feather',
      name: 'home',
    },
  },
  MyPage: {
    label: '마이 페이지',
    icon: {
      family: 'Feather',
      name: 'user',
    },
  },
  OrderHistory: {
    label: '주문 내역',
    icon: {
      family: 'AntDesign',
      name: 'profile',
    },
  },
  Subscribe: {
    label: '찜',
    icon: {
      family: 'Feather',
      name: 'heart',
    },
  },
};

// TODO: resolve inline style
const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <S.TabBarContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const {label, icon} = tabBarData[route.name];

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
              {icon.family === 'AntDesign' && (
                <AntIcon
                  name={icon.name}
                  size={24}
                  color={isFocused ? 'rgba(112, 200, 2, 1)' : '#222'}
                />
              )}
              {icon.family === 'Feather' && (
                <FeatherIcon
                  name={icon.name}
                  size={24}
                  color={isFocused ? 'rgba(112, 200, 2, 1)' : '#222'}
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
