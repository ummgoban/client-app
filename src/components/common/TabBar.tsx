import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {HomeStackParamList} from '../../types/StackNavigationType';

type TabBarComponentType = {
  [route in keyof HomeStackParamList]: {
    label: string;
    icon: string;
  };
};

const tabBarData: TabBarComponentType = {
  Feed: {
    label: '홈',
    icon: 'https://legacy.reactjs.org/logo-og.png',
  },
  MyPage: {
    label: '마이 페이지',
    icon: 'https://legacy.reactjs.org/logo-og.png',
  },
};

// TODO: resolve inline style
const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
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
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Image source={{uri: icon}} style={{width: 24, height: 24}} />
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
