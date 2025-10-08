// src/components/ProgressBar.js
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export default function ProgressBar({ time, totalTime, mode }) {
  const percentage = (time / totalTime) * 100;
  const color = mode === 'work' ? COLORS.primary : COLORS.secondary;

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.bar, 
          { 
            width: `${percentage}%`,
            backgroundColor: color,
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    marginBottom: 30,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});