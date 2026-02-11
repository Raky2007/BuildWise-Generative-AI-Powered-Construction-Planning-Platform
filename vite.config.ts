import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Injecting the provided Gemini API key directly into the application
    'process.env.API_KEY': JSON.stringify('AIzaSyD3lGePOUw6nLGK63h2LNLVasJHrqsgWCM')
  }
});