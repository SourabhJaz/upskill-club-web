import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Latest from './Latest';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { Course, GetCourseResponse } from './interface';

const StyledCardContent = styled(CardContent)({
  padding: 16,
});

const renderCourseLoading = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Skeleton height={72} width="70%" variant="rectangular" sx={{ marginBottom: '21px' }} />
        <Skeleton height={325} variant="rectangular" />
        <Skeleton height={160} variant="rectangular" />
      </Box>
    </Container>
  );
};

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = React.useState<Course>();
  const [courseLoading, setCourseLoading] = React.useState(false);
  const [coursePresent, setCoursePresent] = React.useState(true);
  const [courseImageLoaded, setCourseImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        return undefined;
      }
      const response = await UpskillClubApi.getCourseById<GetCourseResponse>({ courseId: id });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      if ('id' in response.data) {
        setCourse(response.data);
      } else {
        setCoursePresent(false);
      }
      setCourseLoading(false);
    };
    setCourseLoading(true);
    fetchCourse();
  }, [id]);

  if (!coursePresent) return <div>Course not found</div>;

  if (courseLoading) {
    return renderCourseLoading();
  }

  return (
    course && (
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="h2" gutterBottom>
            {course.title}
          </Typography>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={325}
            sx={{
              display: courseImageLoaded ? 'none' : 'block',
            }}
          />
          <CardMedia
            component="img"
            image={course.image_url}
            alt={course.title}
            sx={{
              height: 325,
              objectFit: 'cover',
              display: courseImageLoaded ? 'block' : 'none',
            }}
            onLoad={() => setCourseImageLoaded(true)}
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
    )
  );
}
