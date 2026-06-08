import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin to serve static glossary HTML pages bypassing the SPA fallback
function staticGlossaryPlugin() {
  return {
    name: 'static-glossary',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = req.url || ''
        // Match /glossary/ and /glossary/series-N/
        if (url.startsWith('/glossary/') || url === '/glossary') {
          // Normalize: strip query strings
          const cleanUrl = url.split('?')[0]
          // Build the file path
          let filePath = path.join(__dirname, 'public', cleanUrl)
          // If it ends with /, try index.html
          if (filePath.endsWith('/') || !path.extname(filePath)) {
            filePath = path.join(filePath, 'index.html')
          }
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(filePath))
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [staticGlossaryPlugin(), react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})

