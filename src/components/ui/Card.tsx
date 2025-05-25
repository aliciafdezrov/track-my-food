import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const Container = onPress ? Pressable : View;

  return (
    <Container
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          shadowColor: colors.text,
        },
        style,
      ]}
      onPress={onPress}
    >
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              type="default"
              style={[styles.subtitle, { color: colors.textSecondary }]}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
        {children && <View style={styles.body}>{children}</View>}
      </ThemedView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  body: {
    marginTop: 8,
  },
});
