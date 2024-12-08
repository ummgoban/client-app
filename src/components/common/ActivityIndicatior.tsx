import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const CustomActivityIndicator = () => (
  <ActivityIndicator animating={true} theme={{colors: {primary: 'green'}}} />
);

export default CustomActivityIndicator;
