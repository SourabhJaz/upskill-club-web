import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CoursePage from './components/CoursePage';
import SessionPage from './components/SessionPage';
import { AuthorProfile } from './components/AuthorProfile';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import AppBar from './components/AppAppBar';
import About from './components/About';

export default function App() {
  const mode = 'dark';
  const defaultTheme = responsiveFontSizes(createTheme({ palette: { mode } }));

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <Container sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4, marginTop: 10 }}>
        <Router basename='/'>
          <AppBar />
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/session/:id" element={<SessionPage />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
          <Footer />
        </Router>
      </Container>
    </ThemeProvider>
  );
}
