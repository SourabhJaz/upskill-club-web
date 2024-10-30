import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainContent from './MainContent';
import Latest from './Latest';
import { Helmet } from 'react-helmet';

export default function Blog() {
  return (
    <Container maxWidth="lg" component="main">
      <Helmet>
        <title>The Upskill Club</title>
        <meta name="description" content="Explore a variety of courses and upskill with The Upskill Club." />
        <meta name="keywords" content="Upskill, Collaborative Learning, Courses, Online Learning" />
        <link rel="canonical" href="https://www.theupskillclub.com/" />
      </Helmet>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <MainContent />
        <Latest title="Latest Sessions" order="desc" headingVariant="h3" />
      </Box>
    </Container>
  );
}
