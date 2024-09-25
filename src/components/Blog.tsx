import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainContent from './MainContent';
import Latest from './Latest';

export default function Blog() {
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <MainContent />
        <Latest title="Latest Sessions" order="desc" />
      </Box>
    </Container>
  );
}
