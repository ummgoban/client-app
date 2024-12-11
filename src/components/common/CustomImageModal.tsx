import React from 'react';
import {StyleSheet} from 'react-native';
import ImageModal from 'react-native-image-modal';

type CustomImageModalProps = {
  uri: string;
  borderRadius?: number;
};

const CustomImageModal: React.FC<CustomImageModalProps> = ({
  uri,
  borderRadius = 18,
}) => {
  return (
    <ImageModal
      source={{uri}}
      style={[styles.thumbnail, {borderRadius}]}
      resizeMode="cover"
      modalImageResizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
  },
});

export default CustomImageModal;
