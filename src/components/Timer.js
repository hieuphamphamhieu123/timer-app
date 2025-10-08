// src/components/Timer.js
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export default function Timer({ minutes, seconds, isRunning }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
      <Text style={styles.statusText}>
        {isRunning ? '⏱️ Đang chạy...' : '⏸️ Đã tạm dừng'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: 'monospace',
  },
  statusText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
});