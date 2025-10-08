// src/components/Stats.js
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export default function Stats({ todayCount, totalCount }) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{todayCount}</Text>
        <Text style={styles.statLabel}>Hôm nay</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{totalCount}</Text>
        <Text style={styles.statLabel}>Tổng cộng</Text>
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
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
});