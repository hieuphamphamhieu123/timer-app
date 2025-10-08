// src/components/History.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export default function History({ sessions, onClear }) {
  const recentSessions = sessions.slice(-5).reverse();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Lịch sử gần đây</Text>
        {sessions.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearButton}>🗑️ Xóa</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {sessions.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có phiên nào</Text>
      ) : (
        recentSessions.map((session) => (
          <View key={session.id} style={styles.item}>
            <Text style={styles.date}>
              {new Date(session.date).toLocaleString('vi-VN')}
            </Text>
            <Text style={styles.duration}>
              ✅ {session.duration} phút
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearButton: {
    color: COLORS.danger,
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  date: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  duration: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});