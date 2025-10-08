// src/styles/theme.js
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 140,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    color: COLORS.text,
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});