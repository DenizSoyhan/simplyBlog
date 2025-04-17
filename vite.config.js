import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/simplyBlog/`, //<---Change the simplyBlog to your own repo name!
})
