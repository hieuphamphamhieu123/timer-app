// src/components/TimerControls.js
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/config';

export default function TimerControls({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset, 
  onSwitchMode,
  mode 
}) {
  return (
    <View>
      {/* Start/Pause và Reset */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: isRunning ? COLORS.secondary : COLORS.primary }
          ]}
          onPress={isRunning ? onPause : onStart}
        >
          <Text style={styles.buttonText}>
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.danger }]}
          onPress={onReset}
        >
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Switch Mode */}
      <TouchableOpacity 
        style={styles.switchButton}
        onPress={onSwitchMode}
      >
        <Text style={styles.switchButtonText}>
          Chuyển sang {mode === 'work' ? 'Break' : 'Work'} 🔀
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 10,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: COLORS.info,
    borderRadius: 10,
    alignSelf: 'center',
  },
  switchButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});