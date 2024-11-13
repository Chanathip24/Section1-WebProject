import { defineConfig } from 'vite'
import { config } from 'dotenv'
import react from '@vitejs/plugin-react'

//loadenv
config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env' : process.env
  }

})
