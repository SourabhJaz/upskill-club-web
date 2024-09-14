import React from 'react';
import Container from '@mui/material/Container';
import MainContent from './MainContent';
import Latest from './Latest';

export default function Blog() {
  return (
        <Container         
        maxWidth="lg"
        component="main">
          <MainContent />
          <Latest title='Latest Sessions' courseId={null}/>
        </Container>
  );
}
