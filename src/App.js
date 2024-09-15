import Blog from './components/Blog';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import CoursePage from './components/CoursePage';
import SessionPage from './components/SessionPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function App() {
  const mode = 'dark';
  const defaultTheme = createTheme({ palette: { mode } });


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <Container sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4, marginTop: 10 }}>
      <Router basename='/upskill-club-web'>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Routes>
      </Router>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}