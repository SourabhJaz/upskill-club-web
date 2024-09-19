import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Latest from './Latest'; // Import the Sessions component
import { UpskillClubApi } from '../apis';

const StyledCardMedia = styled(CardMedia)({
  height: 325,
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  padding: 16,
});

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = React.useState(null);

  React.useEffect(() => {
    const fetchCourse = async () => {
      const response = await UpskillClubApi.getCourseById({ courseId: id });
      if (response.success) {
        setCourse(response.data);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h2" gutterBottom>
          {course.title}
        </Typography>
        <StyledCardMedia
          component="img"
          image={course.image}
          loading="lazy"
          alt={course.title}
        />
        <StyledCardContent>
          <Typography variant="h5" gutterBottom>
            {course.author.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {course.short_description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {course.created_at}
          </Typography>
        </StyledCardContent>
        <Latest courseId={id} title='Sessions' /> {/* Include the Sessions component */}
      </Box>
    </Container>
  );
}
