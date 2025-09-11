import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ For Vite's integration

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
