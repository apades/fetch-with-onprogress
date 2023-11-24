import path from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

const pr = (...p) => path.resolve(__dirname, ...p)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3445,
    https: {
      key: fs.readFileSync(pr('../../localhost-key.pem')),
      cert: fs.readFileSync(pr('../../localhost.pem')),
    },
  },
})
