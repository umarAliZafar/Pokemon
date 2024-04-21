// pages/_app.js

import { QueryClientProvider } from 'react-query';
import queryClient from '../utils/queryClient';
import Dashboard from './Dashboard'
// import '../styles/globals.css'; // Assuming you have a global styles file

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
