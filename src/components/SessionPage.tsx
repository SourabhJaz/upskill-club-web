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
import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Utils } from '../common';
import { AuthorCard } from './Author';
import { EntityParser } from '../entities';
import { ParsedConcept, ParsedSession } from '../entities/interface';

const BoldText = ({ text }: { text: string }) => {
  // Replace words surrounded by ** with <strong> tags
  const boldText = text.split(/(\*\*.*?\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });

  return boldText;
};

const getHeadingLevelText = (text: string) => {
  return (
    <Typography variant="h4" gutterBottom>
      <BoldText text={text} />
    </Typography>
  );
};

const getFirstLevelText = (text: string) => {
  if (text.length > 26) return <Typography sx={{ fontWeight: 'regular' }}>{text}</Typography>;
  return (
    <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
      <BoldText text={text} />
    </Typography>
  );
};

const getSecondLevelText = (text: string) => {
  return (
    <ListItem>
      <Typography sx={{ display: 'list-item', paddingLeft: 2 }}>
        <BoldText text={text} />
      </Typography>
    </ListItem>
  );
};

const getThirdLevelText = (text: string) => {
  return (
    <Typography sx={{ fontStyle: 'italic', fontWeight: 'regular', paddingLeft: 8 }}>
      <BoldText text={text} />
    </Typography>
  );
};

const getHyperLinkText = (text: string) => {
  const [linkText, link] = text.split('http');

  return (
    <Typography sx={{ fontStyle: 'italic', fontWeight: 'regular', paddingLeft: 8, textDecoration: 'underline' }}>
      <a href={`http${link}`} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    </Typography>
  );
};

const getdescriptionComponent = (descriptionText: string) => {
  const words = descriptionText.split(' ');
  const componentList: any[] = [];
  let index = 0,
    count = 0;
  while (index < words.length) {
    count = 0;
    let stringStart, stringEnd;
    if (words[index] == '<level_0>') {
      stringStart = index + 1;
      while (words[index] !== '</level_0>' && count < 500) {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getHeadingLevelText(words.slice(stringStart, stringEnd).join(' ')));
    }
    if (words[index] == '<level_1>') {
      stringStart = index + 1;
      while (words[index] !== '</level_1>' && count < 500) {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getFirstLevelText(words.slice(stringStart, stringEnd).join(' ')));
    } else if (words[index] == '<level_2>') {
      stringStart = index + 1;
      while (words[index] !== '</level_2>' && count < 500) {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getSecondLevelText(words.slice(stringStart, stringEnd).join(' ')));
    } else if (words[index] == '<level_3>') {
      stringStart = index + 1;
      while (words[index] !== '</level_3>' && count < 500) {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getThirdLevelText(words.slice(stringStart, stringEnd).join(' ')));
    } else if (words[index] == '<level_4>') {
      stringStart = index + 1;
      while (words[index] !== '</level_4>' && count < 500) {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getThirdLevelText(words.slice(stringStart, stringEnd).join(' ')));
    } else if (words[index] == '<href>') {
      stringStart = index + 1;
      while (words[index] !== '</href>') {
        index++;
        count++;
      }
      stringEnd = index;
      componentList.push(getHyperLinkText(words.slice(stringStart, stringEnd).join(' ')));
    }
    index++;
  }
  return componentList;
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

  const updateConceptImageLoading = (idx: number) => {
    setConceptImagesLoaded((currentState) => {
      return currentState.map((value, index) => {
        if (idx === index) {
          return true;
        }
        return value;
      });
    });
  };

  if (sessionConceptsLoading) return <div>Loading...</div>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: { xs: '100%', md: '70%' } }}>
      {sessionDetails && (
        <StyledCard>
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
              onClick={() => navigate(`/course/${sessionDetails.course.id}`)}
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
                marginTop: 5,
                marginBottom: 5,
              }}
            />
          )}
        </StyledCard>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                  <CardMedia
                    component="img"
                    image={concept.image}
                    alt={concept.title}
                    sx={{
                      width: { xs: '100%', md: '100%' },
                      display: conceptImagesLoaded[idx] ? 'block' : 'none',
                    }}
                    onLoad={() => updateConceptImageLoading(idx)}
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
