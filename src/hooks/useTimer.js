// src/hooks/useTimer.js
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

export const useTimer = (workTime, breakTime, onWorkComplete) => {
  const [time, setTime] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');

  useEffect(() => {
    let interval;
    
    if (isRunning && time > 0) {
      activateKeepAwakeAsync();
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      deactivateKeepAwake();
    }
    
    if (time === 0 && isRunning) {
      handleTimerComplete();
    }
    
    return () => {
      clearInterval(interval);
      deactivateKeepAwake();
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (!isRunning) {
      setTime(mode === 'work' ? workTime * 60 : breakTime * 60);
    }
  }, [workTime, breakTime, mode]);

  const handleTimerComplete = async () => {
    setIsRunning(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    if (mode === 'work') {
      Alert.alert(
        '🎉 Hoàn thành!',
        'Hãy nghỉ ngơi 5 phút nhé!',
        [{ text: 'OK' }]
      );
      
      if (onWorkComplete) {
        onWorkComplete();
      }
      
      setMode('break');
      setTime(breakTime * 60);
    } else {
      Alert.alert(
        '✅ Hết giờ nghỉ!',
        'Sẵn sàng làm việc!',
        [{ text: 'OK' }]
      );
      setMode('work');
      setTime(workTime * 60);
    }
  };

  const start = () => {
    setIsRunning(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const pause = () => {
    setIsRunning(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(mode === 'work' ? workTime * 60 : breakTime * 60);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const switchMode = () => {
    setIsRunning(false);
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setTime(newMode === 'work' ? workTime * 60 : breakTime * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    time,
    minutes,
    seconds,
    isRunning,
    mode,
    start,
    pause,
    reset,
    switchMode,
  };
};