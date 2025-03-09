import React from 'react';

import {
  TextInput as ReactNativePaperTextInput,
  type TextInputProps as ReactNativePaperTextInputProps,
} from 'react-native-paper';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import S from './TextInput.style';
import theme from '@/context/theme';

type TextInputProps = {
  label?: string;
  labelPosition?: 'top' | 'left';
  validation?: (value: string) => boolean;
  errorMessage?: string;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
} & Omit<ReactNativePaperTextInputProps, 'mode' | 'label'>;

/**
 * @description
 * label={undefined}: label을 사용할 경우 아웃라인에 표시되기 때문에 undefined 이용
 *
 */
const TextInput = ({
  label,
  labelPosition = 'top',
  validation,
  errorMessage,
  errorStyle,
  style,
  ...props
}: TextInputProps) => {
  const value = props.value;
  return (
    <S.Container style={style}>
      <S.TextInputWrapper
        style={
          label
            ? labelPosition === 'top'
              ? styles.labelTop
              : styles.labelLeft
            : null
        }>
        {label && <S.Label>{label}</S.Label>}
        <S.TextInputContainer>
          <ReactNativePaperTextInput
            {...props}
            mode="outlined"
            style={styles.input}
            label={undefined}
            outlineStyle={
              value && validation && !validation(value)
                ? styles.errorInput
                : null
            }
          />
        </S.TextInputContainer>
      </S.TextInputWrapper>
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
  errorInput: {
    borderColor: theme.colors.error,
  },
  labelTop: {
    display: 'flex',
    flexDirection: 'column',
  },
  labelLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default TextInput;
