// src/screens/HomeScreen.js
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTimer } from '../hooks/useTimer';
import { useStorage } from '../hooks/useStorage';
import Timer from '../components/Timer';
import TimerControls from '../components/TimerControls';
import Stats from '../components/Stats';
import ProgressBar from '../components/ProgressBar';
import History from '../components/History';
import { COLORS } from '../constants/config';
// Thêm vào đầu file
import SessionChart from '../components/SessionChart';
import StreakCard from '../components/StreakCard';
export default function HomeScreen({ onOpenSettings }) {
  const {
    workTime,
    breakTime,
    sessions,
    todayCount,
    saveSession,
    clearHistory,
  } = useStorage();

  const {
    minutes,
    seconds,
    time,
    isRunning,
    mode,
    start,
    pause,
    reset,
    switchMode,
  } = useTimer(workTime, breakTime, saveSession);

  const handleClearHistory = () => {
    Alert.alert(
      'Xóa lịch sử',
      'Bạn có chắc muốn xóa tất cả lịch sử?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: async () => {
            const success = await clearHistory();
            if (success) {
              Alert.alert('✅ Đã xóa lịch sử!');
            }
          }
        },
      ]
    );
  };

  const totalTime = mode === 'work' ? workTime * 60 : breakTime * 60;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.modeText}>
            {mode === 'work' ? '💼 Work Time' : '☕ Break Time'}
          </Text>
          <TouchableOpacity onPress={onOpenSettings}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <Stats todayCount={todayCount} totalCount={sessions.length} />
        <StreakCard sessions={sessions} />

        {/* Timer */}
        <Timer minutes={minutes} seconds={seconds} isRunning={isRunning} />

        {/* Progress Bar */}
        <ProgressBar time={time} totalTime={totalTime} mode={mode} />

        {/* Controls */}
        <TimerControls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSwitchMode={switchMode}
          mode={mode}
        />

        {/* History */}
        <History sessions={sessions} onClear={handleClearHistory} />
        <SessionChart sessions={sessions} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingsIcon: {
    fontSize: 30,
  },
});