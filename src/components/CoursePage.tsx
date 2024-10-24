import * as React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Latest from './Latest';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { ParsedCourse } from '../entities/interface';
import { AuthorCard } from './Author';
import { EntityParser } from '../entities';

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
  const [searchParams] = useSearchParams();
  const id = searchParams.get('courseId');
  const [course, setCourse] = React.useState<ParsedCourse>();
  const [courseLoading, setCourseLoading] = React.useState(false);
  const [coursePresent, setCoursePresent] = React.useState(true);
  const [courseImageLoaded, setCourseImageLoaded] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        return undefined;
      }
      const response = await UpskillClubApi.getCourseById({ courseId: id });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      if ('id' in response.data) {
        const course = response.data;
        const parsedCourse = EntityParser.getParsedCourse(course);
        setCourse(parsedCourse);
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
    id &&
    course && (
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
                  fontWeight: 'medium',
                }}
                onClick={() => navigate(`/`)}
              >
                Home
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
                  fontWeight: 'medium',
                }}
                onClick={() => navigate(`/course?courseId=${course.id}`)}
              >
                {course.title}
              </Typography>
            </Breadcrumbs>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {course.outline}
              </Typography>
            </Box>
            <Box>
              <AuthorCard
                authors={course.authors}
                createdAt={course.createdAt}
                styleProps={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              />
            </Box>
          </Box>
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
            image={course.image}
            alt={course.title}
            sx={{
              height: 400,
              objectFit: 'cover',
              display: courseImageLoaded ? 'block' : 'none',
            }}
            onLoad={() => setCourseImageLoaded(true)}
          />
          <Latest courseId={id} title="Sessions" displayTag={false} headingVariant="h3" />
        </Box>
      </Container>
    )
  );
}
