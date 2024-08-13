import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmptyState = ({ message, iconName, iconSize = 100, iconColor = '#555' }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons testID='icon' name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EmptyState;
