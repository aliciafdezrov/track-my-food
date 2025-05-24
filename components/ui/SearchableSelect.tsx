import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';

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
  label?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  style,
  inputStyle,
  textStyle,
  error,
  label,
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
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.input, inputStyle, error && styles.inputError]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.selectedText, textStyle]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar..."
            placeholderTextColor="#999999"
          />
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
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
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  selectedText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdown: {
    position: 'sticky',
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontSize: 16,
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
