import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  error,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        style={[styles.input, inputStyle, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
