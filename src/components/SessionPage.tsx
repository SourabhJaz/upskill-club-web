import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { UpskillClubApi } from '../apis';
import { styled } from '@mui/material/styles';
import { Utils } from '../common';
import { AuthorCard } from './Author';
import { EntityParser } from '../entities';
import { ParsedConcept, ParsedSession } from '../entities/interface';
import MarkdownRenderer from './MarkdownRenderer';

const getdescriptionComponent = (descriptionText: string) => {
  const formattedDescription = descriptionText.replace(/\\/g, '\n');
  return (
      <MarkdownRenderer markdown={formattedDescription}/>
  );
};

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  gap: 16,
  flexDirection: 'column',
  height: '100%',
  boxShadow: 'none',
  backgroundImage: 'none',
  paddingBottom: 16,
}));

export default function SessionPage() {
  const { id } = useParams();
  const [sessionConcepts, setConcepts] = React.useState<ParsedConcept[]>([]);
  const [sessionDetails, setSession] = React.useState<ParsedSession>();
  const [sessionConceptsLoading, setSessionConceptsLoading] = React.useState(false);
  const [conceptImagesLoaded, setConceptImagesLoaded] = React.useState<boolean[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        return undefined;
      }
      const response = await UpskillClubApi.getConceptsBySessionId({ sessionId: id });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      const { data } = response;
      const sessionConcepts = data.results.map((concept) => EntityParser.getParsedConcept(concept));

      const { session } = data.results[0];
      const sessionInformation = EntityParser.getParsedSession(session);
      const courseImageLoading = sessionConcepts.map(() => false);
      setConceptImagesLoaded(courseImageLoading);
      setConcepts(sessionConcepts);
      setSession(sessionInformation);
      setSessionConceptsLoading(false);
    };
    setSessionConceptsLoading(true);
    fetchCourse();
  }, [id]);

  if (sessionConceptsLoading) return <div>Loading...</div>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: { xs: '100%', md: '70%' } }}>
      {sessionDetails && (
        <StyledCard>
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
                onClick={() => navigate(`/course?courseId=${sessionDetails.course.id}`)}
              >
                {sessionDetails.course.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
                  fontWeight: 'medium',
                }}
                onClick={() => navigate(``)}
              >
                {sessionDetails.title}
              </Typography>
            </Breadcrumbs>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
                {sessionDetails.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {sessionDetails.description}
              </Typography>
            </Box>
            <Box>
              <AuthorCard
                authors={sessionDetails.authors}
                createdAt={sessionDetails.createdAt}
                styleProps={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              />
            </Box>
          </Box>
          {sessionDetails.imageUrl && (
            <CardMedia
              component="img"
              alt="green iguana"
              image={sessionDetails.imageUrl}
              aspect-ratio="16 / 9"
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderBottom: '1px solid',
                borderColor: 'divider',
                marginTop: 5
              }}
            />
          )}
        </StyledCard>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        {sessionConcepts.map((concept, idx) => {
          const descriptionComponent = getdescriptionComponent(concept.description);
          return (
            <React.Fragment key={`concept_${idx}_desc`}>
              <Typography variant="h3" gutterBottom>
                {concept.title}
              </Typography>
              {descriptionComponent}
              {concept.image && (
                <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'center' }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={325}
                    sx={{
                      display: conceptImagesLoaded[idx] ? 'none' : 'block',
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Container>
  );
}
