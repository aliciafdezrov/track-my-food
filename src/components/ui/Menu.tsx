import React, { ReactNode } from 'react';
import { View, StyleSheet, FlatList, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Option {
  label: string;
  value: string;
}

interface MenuProps {
  options: Option[];
  style?: ViewStyle;
  emptyState?: ReactNode;
  onSelect: (option: Option) => void;
}

export const Menu: React.FC<MenuProps> = ({
  options,
  style,
  emptyState,
  onSelect,
}) => {
  return (
    <View style={[styles.dropdown, style]}>
      {options.length === 0 ? (
        emptyState
      ) : (
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelect(item)}
              style={styles.option}
              pressRetentionOffset={{ top: 100 }}
            >
              <ThemedText style={styles.optionText}>{item.label}</ThemedText>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
});
