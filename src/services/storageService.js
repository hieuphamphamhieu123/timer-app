// src/services/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';

export const storageService = {
  // Lưu session
  async saveSession(session) {
    try {
      const existingSessions = await this.getSessions();
      const sessions = [...existingSessions, session];
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      return sessions;
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  },

  // Lấy tất cả sessions
  async getSessions() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  // Xóa tất cả sessions
  async clearSessions() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SESSIONS);
    } catch (error) {
      console.error('Error clearing sessions:', error);
      throw error;
    }
  },

  // Lưu work time
  async saveWorkTime(minutes) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WORK_TIME, minutes.toString());
    } catch (error) {
      console.error('Error saving work time:', error);
      throw error;
    }
  },

  // Lấy work time
  async getWorkTime() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WORK_TIME);
      return data ? parseInt(data) : null;
    } catch (error) {
      console.error('Error loading work time:', error);
      return null;
    }
  },

  // Lưu break time
  async saveBreakTime(minutes) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BREAK_TIME, minutes.toString());
    } catch (error) {
      console.error('Error saving break time:', error);
      throw error;
    }
  },

  // Lấy break time
  async getBreakTime() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BREAK_TIME);
      return data ? parseInt(data) : null;
    } catch (error) {
      console.error('Error loading break time:', error);
      return null;
    }
  },

  // Lấy số sessions hôm nay
  getTodaySessions(sessions) {
    const today = new Date().toDateString();
    return sessions.filter(s => 
      new Date(s.date).toDateString() === today
    );
  },
};