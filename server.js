import express from 'express';
import compression from 'compression';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as vite from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();
  app.use(compression());

  let viteServer;
  if (!isProduction) {
    viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(viteServer.middlewares);
  } else {
    app.use(sirv('dist/client', { single: true }));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;

      if (!isProduction) {
        template = await viteServer.transformIndexHtml(url, 
          await vite.loadConfigFromFile(false, 'vite.config.ts')
        );
        render = (await viteServer.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = await import('./dist/client/index.html');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const { html: appHtml, state } = render(url);
      const html = template.replace('<!--app-html-->', appHtml)
        .replace('<!--app-state-->', `<script>window.__INITIAL_STATE__=${JSON.stringify(state)}</script>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      viteServer?.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();