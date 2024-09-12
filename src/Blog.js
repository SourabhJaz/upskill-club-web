import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';

export default function Blog() {
  const mode = 'dark';
  const defaultTheme = createTheme({ palette: { mode } });

  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4, marginTop: 10 }}
        >
          <MainContent />
          <Latest />
        </Container>
        <Footer />
      </ThemeProvider>
  );
}
