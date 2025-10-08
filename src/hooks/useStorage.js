// src/hooks/useStorage.js
import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { TIMER_CONFIG } from '../constants/config';

export const useStorage = () => {
  const [workTime, setWorkTime] = useState(TIMER_CONFIG.DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(TIMER_CONFIG.DEFAULT_BREAK_TIME);
  const [sessions, setSessions] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu khi khởi động
  useEffect(() => {
    loadAll();
  }, []);

  // Update today count khi sessions thay đổi
  useEffect(() => {
    const todaySessions = storageService.getTodaySessions(sessions);
    setTodayCount(todaySessions.length);
  }, [sessions]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [loadedSessions, loadedWorkTime, loadedBreakTime] = await Promise.all([
        storageService.getSessions(),
        storageService.getWorkTime(),
        storageService.getBreakTime(),
      ]);

      setSessions(loadedSessions);
      if (loadedWorkTime) setWorkTime(loadedWorkTime);
      if (loadedBreakTime) setBreakTime(loadedBreakTime);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async () => {
    try {
      const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        duration: workTime,
        type: 'work',
      };
      
      const updatedSessions = await storageService.saveSession(newSession);
      setSessions(updatedSessions);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const saveSettings = async (newWorkTime, newBreakTime) => {
    try {
      await Promise.all([
        storageService.saveWorkTime(newWorkTime),
        storageService.saveBreakTime(newBreakTime),
      ]);
      setWorkTime(newWorkTime);
      setBreakTime(newBreakTime);
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  };

  const clearHistory = async () => {
    try {
      await storageService.clearSessions();
      setSessions([]);
      setTodayCount(0);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  };

  return {
    workTime,
    breakTime,
    sessions,
    todayCount,
    loading,
    saveSession,
    saveSettings,
    clearHistory,
  };
};