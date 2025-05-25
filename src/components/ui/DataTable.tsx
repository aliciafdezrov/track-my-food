import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface Column<T> {
  key: keyof T;
  title: string;
  width?: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowPress?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowPress,
}: DataTableProps<T>) {
  const theme = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
          {columns.map((column) => (
            <View
              key={String(column.key)}
              style={[styles.headerCell, { width: column.width || 150 }]}
            >
              <Text style={[styles.headerText, { color: theme.colors.text }]}>
                {column.title}
              </Text>
            </View>
          ))}
        </View>
        <ScrollView>
          {data.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.row, { backgroundColor: theme.colors.background }]}
              onPress={() => onRowPress?.(item)}
            >
              {columns.map((column) => (
                <View
                  key={String(column.key)}
                  style={[styles.cell, { width: column.width || 150 }]}
                >
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>
                    {String(item[column.key])}
                  </Text>
                </View>
              ))}
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cell: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
});
