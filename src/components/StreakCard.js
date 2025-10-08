// src/components/StreakCard.js
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';
import { getCurrentStreak, getTotalMinutesThisWeek } from '../utils/chartUtils';

export default function StreakCard({ sessions }) {
  const streak = getCurrentStreak(sessions);
  const totalMinutes = getTotalMinutesThisWeek(sessions);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.emoji}>🔥</Text>
        <Text style={styles.value}>{streak}</Text>
        <Text style={styles.label}>Ngày liên tiếp</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.item}>
        <Text style={styles.emoji}>⏱️</Text>
        <Text style={styles.value}>{hours}h {minutes}m</Text>
        <Text style={styles.label}>Tuần này</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
});