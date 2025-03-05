import React from 'react';

import {
  TextInput as ReactNativePaperTextInput,
  type TextInputProps as ReactNativePaperTextInputProps,
} from 'react-native-paper';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

import S from './TextInput.style';

type TextInputProps = {
  validation?: (value: string) => boolean;
  errorMessage?: string;
  errorStyle?: StyleProp<TextStyle>;
} & Omit<ReactNativePaperTextInputProps, 'mode' | 'label'>;

/**
 * @description
 * mode={'outlined'}: outline 이용
 * label={undefined}: label을 사용할 경우 아웃라인에 표시되기 때문에 undefined 이용
 *
 */
const TextInput = ({
  validation,
  errorMessage,
  errorStyle,
  ...props
}: TextInputProps) => {
  const value = props.value;
  return (
    <S.Container>
      <S.TextInputContainer>
        <ReactNativePaperTextInput
          {...props}
          mode="outlined"
          style={styles.input}
          label={undefined}
        />
      </S.TextInputContainer>
      {value && validation && errorMessage && !validation(value) && (
        <S.ErrorContainer>
          <S.ErrorText style={errorStyle}>{errorMessage}</S.ErrorText>
        </S.ErrorContainer>
      )}
    </S.Container>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 48,
  },
});

export default TextInput;
