import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { UpskillClubApi } from '../apis';
import { List, ListItem, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { GetConceptResponse, ParsedConcept, ParsedArticle } from './interface';
import { Utils } from '../common';
import { Author } from './Author';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const getHeadingLevelText = (text) => {
  return (
    <Typography variant="h4" gutterBottom>
      {text}
    </Typography>
  );
};
const getFirstLevelText = (text) => {
  if (text.length > 26)
   return <Typography sx={{fontWeight: 'regular'}}>{text}</Typography>;
  return <Typography variant='h5' sx={{fontWeight: 'bold'}} gutterBottom>{text}</Typography>;
};
const getSecondLevelText = (text) => {
  return (
    <ListItem>
      <Typography sx={{display: 'list-item', paddingLeft: 2}}>{text}</Typography>
    </ListItem>
  );
};
const getThirdLevelText = (text) => {
  return (
    <Typography sx={{fontStyle: 'italic', fontWeight: 'regular', paddingLeft: 8}}>
    {text}
    </Typography>
  );
};
const getFourthLevelText = (text) => {
  return (
    <ListItem>
      <ListItem>
        <ListItem>
          {text}
        </ListItem>
      </ListItem>
    </ListItem>
  );
};
const getdescriptionComponent = (descriptionText) => {
  const words = descriptionText.split(' ');
  const componentList: any[] = [];
  let index = 0, count = 0;
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
      componentList.push(getFourthLevelText(words.slice(stringStart, stringEnd).join(' ')));
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
  paddingBottom: 16
}));

export default function SessionPage() {
  const { id } = useParams();
  const [sessionConcepts, setConcepts] = React.useState<ParsedConcept[]>([]);
  const [sessionDetails, setSession] = React.useState<ParsedArticle>();
  const [sessionConceptsLoading, setSessionConceptsLoading] = React.useState(false);
  const [conceptImagesLoaded, setConceptImagesLoaded] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        return undefined;
      }
      const response = await UpskillClubApi.getConcept<GetConceptResponse>({ sessionId: id });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      const { data } = response;
      const conceptsInformation = data.results.map((concept) => ({
        id: concept.id,
        title: concept.title,
        image: concept.image_url,
        description: concept.description 
      }));
      const { session } = data.results[0];
      const sessionInformation = {
        id: session.id,
        tag: session.course.title,
        title: session.title,
        imageUrl: session.image_url,
        description: session.outline,
        authors: [
          {
            name: session.author.name,
            avatar: session.author.thumbnail || '/static/images/avatar/default.jpg',
          },
        ],
        createdAt: session.created_at,
      };
      const courseImageLoading = conceptsInformation.map(() => false);
      setConceptImagesLoaded(courseImageLoading);
      setConcepts(conceptsInformation);
      setSession(sessionInformation);
      setSessionConceptsLoading(false);
    };
    setSessionConceptsLoading(true);
    fetchCourse();
  }, [id]);

  const updateConceptImageLoading = (idx: number) => {
    console.log(`updateConceptImageLoading called for idx ${idx}`);
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
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: { xs: '100%', md: '70%' }}}>
      {sessionDetails && <StyledCard>
       <Typography sx={{ typography: { md: 'h1', xs: 'h2' } }}  gutterBottom>
        {sessionDetails.title}
      </Typography>
      {sessionDetails.imageUrl && <CardMedia
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
          }}
      />}
      <Author
        authors={sessionDetails.authors}
        createdAt={sessionDetails.createdAt}
        styleProps={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        />
     </StyledCard>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4}}>
        {sessionConcepts.map((concept, idx) => {
          const descriptionComponent = getdescriptionComponent(concept.description);
          return (
            <>
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
            </>
          );
        })}
      </Box>
    </Container>
  );
}
