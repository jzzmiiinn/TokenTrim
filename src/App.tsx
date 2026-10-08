import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/themes/theme-provider';
import NotFound from '@/components/not-found';
import LandingPage from '@/features/landing/landing-page';
import { DEFAULT_THEME } from '@/components/themes/theme.config';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

export default function App() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Toaster />
          <Routes>
            {/* Product Landing & Interactive Demo */}
            <Route path='/' element={<LandingPage />} />

            {/* 404 Catch-all */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </NuqsAdapter>
    </BrowserRouter>
  );
}
