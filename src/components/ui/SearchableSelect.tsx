import React, { useState } from 'react';
import { StyleSheet, ViewStyle, TextStyle, Keyboard, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { TextInput } from './TextInput';
import { Menu } from './Menu';
import { Colors } from '@/src/constants/Colors';

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
        <Menu
          options={filteredOptions}
          onSelect={handleSelect}
          emptyState={
            <View style={styles.emptyStateContainer}>
              <ThemedText style={styles.emptyStateText}>
                No se encontraron resultados
              </ThemedText>
            </View>
          }
        />
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
  searchInput: {
    fontSize: 16,
    width: '100%',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  emptyStateContainer: {
    padding: 12,
  },
  emptyStateText: {
    color: Colors.light.text,
  },
});
