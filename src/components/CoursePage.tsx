import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Latest from './Latest';
import { useNavigate } from 'react-router-dom';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { ParsedCourse } from '../entities/interface';
import { Author } from './Author';
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
  const { id } = useParams();
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
            image={course.image}
            alt={course.title}
            sx={{
              height: 325,
              objectFit: 'cover',
              display: courseImageLoaded ? 'block' : 'none',
            }}
            onLoad={() => setCourseImageLoaded(true)}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={{ '&:hover': { cursor: 'pointer', borderBottom: '1px solid', borderColor: 'divider' } }}
              onClick={() => navigate(`/author/${course.authors[0].id}`)}
            >
              <Author
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
            <Typography variant="body1">{course.outline}</Typography>
          </Box>
          <Latest courseId={id} title="Sessions" />
        </Box>
      </Container>
    )
  );
}
