import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

export function render(url: string) {
  const queryClient = new QueryClient();

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </StaticRouter>
  );

  const state = {
    queryCache: queryClient.getQueryCache().getAll().map(query => ({
      queryKey: query.queryKey,
      data: query.state.data,
    })),
  };

  return { html, state };
}