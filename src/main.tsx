import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { fontVariables } from '@/components/themes/font.config';
import { cn } from '@/lib/utils';
import './styles/globals.css';

document.documentElement.lang = 'en';
document.body.className = cn(
  'bg-background overflow-x-hidden overscroll-none font-sans antialiased',
  fontVariables
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
