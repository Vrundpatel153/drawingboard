import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Load .env.local into process.env for local API simulation
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=')
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim()
        const v = trimmed.slice(idx + 1).trim()
        process.env[k] = v
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-dev-server',
      configureServer(server) {
        server.middlewares.use('/api/submit-lead', async (req, res) => {
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
            res.statusCode = 200;
            res.end();
            return;
          }
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch (_) {
              req.body = {};
            }
            if (!res.status) {
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
            }
            if (!res.json) {
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };
            }
            try {
              const { default: handler } = await import('./api/submit-lead.js');
              await handler(req, res);
            } catch (err) {
              console.error('Local API dev server error:', err);
              res.status(500).json({ error: err.message });
            }
          });
        });
      }
    }
  ],
  server: {
    port: 3004,
    host: true,
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  // Ensure env vars are available
  envPrefix: 'VITE_',
})
