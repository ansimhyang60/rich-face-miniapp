import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'richface',
  brand: {
    displayName: '포춘페이스 랩스',
    primaryColor: '#3182f6',
    icon: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png'
  },
  permissions: [],
  web: {
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build'
    }
  }
});
