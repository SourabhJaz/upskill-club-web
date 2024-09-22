import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Latest from './Latest';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { Course, GetCourseResponse } from './interface';

const StyledCardContent = styled(CardContent)({
  padding: 16,
});

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = React.useState<Course>();

  React.useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const response = await UpskillClubApi.getCourseById<GetCourseResponse>({ courseId: id });
        if (Utils.isErrorResponse(response)) {
          return undefined;
        }
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
        <CardMedia
          component="img"
          image={course.image}
          alt={course.title}
          sx={{
            height: 325,
            objectFit: 'cover',
          }}
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
        <Latest courseId={id} title="Sessions" />
      </Box>
    </Container>
  );
}
