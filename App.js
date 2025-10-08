// App.js
import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return <SettingsScreen onClose={() => setShowSettings(false)} />;
  }

  return <HomeScreen onOpenSettings={() => setShowSettings(true)} />;
}