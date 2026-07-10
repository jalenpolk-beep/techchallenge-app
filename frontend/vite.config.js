import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: [
      'techchallenge-alb-777721223.us-east-1.elb.amazonaws.com',
    ],
  },

  preview: {
    allowedHosts: [
      'techchallenge-alb-777721223.us-east-1.elb.amazonaws.com',
    ],
  },
})
