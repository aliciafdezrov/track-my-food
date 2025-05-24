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
  label?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  error,
  label,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
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
