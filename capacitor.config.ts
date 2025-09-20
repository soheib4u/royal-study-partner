import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.fdf6bbd3a8fc4f75aec95e13dcd4ec9f',
  appName: 'StudentMate',
  webDir: 'dist',
  server: {
    url: 'https://fdf6bbd3-a8fc-4f75-aec9-5e13dcd4ec9f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#001F3F'
    }
  }
};

export default config;