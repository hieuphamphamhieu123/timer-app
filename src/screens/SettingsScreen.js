// src/screens/SettingsScreen.js
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import { commonStyles } from '../styles/theme';
import { COLORS, TIMER_CONFIG } from '../constants/config';

export default function SettingsScreen({ onClose }) {
  const { workTime, breakTime, saveSettings } = useStorage();
  const [newWorkTime, setNewWorkTime] = useState(workTime);
  const [newBreakTime, setNewBreakTime] = useState(breakTime);

  const handleSave = async () => {
    // Validate
    if (newWorkTime < TIMER_CONFIG.MIN_TIME || newWorkTime > TIMER_CONFIG.MAX_TIME) {
      Alert.alert('Lỗi', `Thời gian làm việc phải từ ${TIMER_CONFIG.MIN_TIME}-${TIMER_CONFIG.MAX_TIME} phút`);
      return;
    }

    if (newBreakTime < TIMER_CONFIG.MIN_TIME || newBreakTime > TIMER_CONFIG.MAX_TIME) {
      Alert.alert('Lỗi', `Thời gian nghỉ phải từ ${TIMER_CONFIG.MIN_TIME}-${TIMER_CONFIG.MAX_TIME} phút`);
      return;
    }

    const success = await saveSettings(newWorkTime, newBreakTime);
    if (success) {
      Alert.alert('✅ Đã lưu cài đặt!');
      onClose();
    } else {
      Alert.alert('❌ Có lỗi xảy ra!');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>⚙️ Cài đặt</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.label}>Thời gian làm việc (phút):</Text>
        <TextInput
          style={commonStyles.input}
          value={newWorkTime.toString()}
          onChangeText={(text) => setNewWorkTime(parseInt(text) || 1)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Thời gian nghỉ (phút):</Text>
        <TextInput
          style={commonStyles.input}
          value={newBreakTime.toString()}
          onChangeText={(text) => setNewBreakTime(parseInt(text) || 5)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity 
        style={[commonStyles.button, { backgroundColor: COLORS.primary }]}
        onPress={handleSave}
      >
        <Text style={commonStyles.buttonText}>💾 Lưu cài đặt</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[commonStyles.button, { backgroundColor: COLORS.textSecondary, marginTop: 15 }]}
        onPress={onClose}
      >
        <Text style={commonStyles.buttonText}>← Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 10,
  },
});