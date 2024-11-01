import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainContent from './MainContent';
import Latest from './Latest';
import { Helmet } from 'react-helmet';

export default function Blog() {
  return (
    <Container maxWidth="lg" component="main">
      <Helmet>
        <title>Join The Upskill Club | Collaborative Learning & Professional Development</title>
        <meta name="description" content="Join The Upskill Club to enhance your career through collaborative learning. Connect with professionals at all stages and share knowledge on industry trends." />
        <meta name="keywords" content="Upskill, The Upskill Club, Collaborative Learning, Professional Development, Career Growth, Online Learning" />
        <link rel="canonical" href="https://www.theupskillclub.com/" />
      </Helmet>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <MainContent />
        <Latest title="Latest Sessions" order="desc" headingVariant="h3" />
      </Box>
    </Container>
  );
}
