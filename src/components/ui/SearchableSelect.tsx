import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ViewStyle,
  TextStyle,
  Keyboard,
  Pressable,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { TextInput } from './TextInput';

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  textStyle?: TextStyle;
  error?: string;
  onBlur?: () => void;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  style,
  error,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchText('');
    Keyboard.dismiss();
  };

  const handleOpenSelect = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    onChange('');
    setSearchText('');
    setIsOpen(false);
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <TextInput
        style={styles.searchInput}
        value={selectedOption ? selectedOption.label : searchText}
        onChangeText={setSearchText}
        placeholder="Selecciona o busca un alimento..."
        onFocus={handleOpenSelect}
        onBlur={onBlur}
        onClear={handleClear}
      />

      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={styles.option}
                pressRetentionOffset={{ top: 100 }}
              >
                <ThemedText style={styles.optionText}>{item.label}</ThemedText>
              </Pressable>
            )}
          />
        </View>
      )}

      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
  },
  searchInput: {
    fontSize: 16,
    width: '100%',
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
