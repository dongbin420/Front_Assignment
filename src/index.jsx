import { createRoot } from 'react-dom/client';
import GlobalStyle from '@/styles/GlobalStyle';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
