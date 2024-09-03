import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Text} from 'react-native';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const Icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: state.index === index,
              color: '#673ab7',
              size: 24,
            })
          : null;

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
            {Icon}
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
              {typeof label === 'string' ? label : null}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
