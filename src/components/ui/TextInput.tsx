import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from 'react-native';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
  onClear?: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  error,
  onClear,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[styles.input, inputStyle, error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          {...props}
        />
        {onClear && value ? (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
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
  clearButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999999',
  },
});
