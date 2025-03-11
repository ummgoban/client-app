import React from 'react';
import ImageModal from 'react-native-image-modal';

type CustomImageModalProps = {
  uri: string;
  borderRadius?: number;
  width?: number;
  height?: number;
};

const CustomImageModal: React.FC<CustomImageModalProps> = ({
  uri,
  borderRadius = 18,
  width = 100,
  height = 100,
}) => {
  return (
    <ImageModal
      source={{uri}}
      style={{
        borderRadius,
        width,
        height,
      }}
      resizeMode="cover"
      modalImageResizeMode="contain"
    />
  );
};

export default CustomImageModal;
