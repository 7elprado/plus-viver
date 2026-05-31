import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CardGenerico = ({ 
  title, 
  description, 
  icon, 
  onPress, 
  backgroundColor,
  children 
}) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <LinearGradient
        colors={backgroundColor || ['#6366F1', '#8B5CF6']}
        style={styles.gradient}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </LinearGradient>
    </Pressable>
  );
};

export const CardSimples = ({ title, description, onPress, cor }) => {
  return (
    <Pressable onPress={onPress} style={[styles.simplesCard, { backgroundColor: cor || '#F3F4F6' }]}>
      <Text style={styles.simplesTitle}>{title}</Text>
      {description && <Text style={styles.simplesDescription}>{description}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
  },
  simplesCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  simplesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  simplesDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});
