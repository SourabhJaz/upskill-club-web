import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Latest from './components/Latest'; // Import the Sessions component
import { UpskillClubApi } from './apis';

const StyledCardMedia = styled(CardMedia)({
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  padding: 16,
});

const getdescriptionComponent = (descriptionText) => {
    return descriptionText;
}

export default function SessionPage() {
  const { id } = useParams();
  const [sessionConcepts, setSession] = React.useState(null);

  React.useEffect(() => {
    const fetchCourse = async () => {
      const response = await UpskillClubApi.getConcept({ sessionId: id });
      if (!response.success) {
        return undefined;
      }
      const { data } = response;
      const sessionInformation = data.results.map((concept) => ({
        id: concept.id,
        title: concept.title,
        image: concept.image,
        description: concept.description,
      }));
      setSession(sessionInformation);
    };
    fetchCourse();
  }, [id]);

  if (!sessionConcepts) return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {sessionConcepts.map((session) => {
        const descriptionComponent = getdescriptionComponent(session.description);
        return (<Box>
          <Typography variant="h4" gutterBottom>
            {session.title}
          </Typography>
          {session.image && <StyledCardMedia
            component="img"
            image={session.image}
            alt={session.title}
          />}
          {descriptionComponent}
          {/* <StyledCardContent>
            <Typography variant="h5" gutterBottom>
              {c.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {course.short_description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {course.created_at}
            </Typography>
          </StyledCardContent> */}
          </Box>)
        })}
      </Box>
    </Container>
  );
}
