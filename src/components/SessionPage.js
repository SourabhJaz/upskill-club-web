import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { UpskillClubApi } from '../apis';
import { ListItem } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const StyledCardMedia = styled(CardMedia)({
  maxWidth: '60%',
  width: { xs: '100%', md: 'fit-content'},
});
const getHeadingLevelText = (text) => {
  return (<Typography variant="h5" gutterBottom>
    {text}
  </Typography>);
}
const getFirstLevelText = (text) => {
  return (<Typography variant='string'>
    {text}
  </Typography>);
}
const getSecondLevelText = (text) => {
  return (<ListItem>
      <ChevronRightIcon/>
      {text}
      </ListItem>);
}
const getThirdLevelText = (text) => {
  return (<ListItem >
      <ListItem>
      <SubdirectoryArrowRightIcon/>
      {text}
      </ListItem>
    </ListItem>);
}
const getFourthLevelText = (text) => {
  return (<ListItem >
    <ListItem>
    <ListItem>
    <SubdirectoryArrowRightIcon/>
    {text}
    </ListItem>
    </ListItem>
  </ListItem>);
}
const getdescriptionComponent = (descriptionText) => {
    const words = descriptionText.split(' ');
    const componentList = [];
    let index = 0, count = 0;
    while (index < words.length) {
      count = 0;
      let stringStart, stringEnd;
      if (words[index] == '<level_0>') {
        stringStart = index+1;
        while(words[index] !== '</level_0>' && count < 500) {
          index++;
          count++;
        }
        stringEnd = index;
        componentList.push(getHeadingLevelText(words.slice(stringStart, stringEnd).join(' ')));
      }
      if (words[index] == '<level_1>') {
        stringStart = index+1;
        while(words[index] !== '</level_1>' && count < 500) {
          index++;
          count++;
        }
        stringEnd = index;
        componentList.push(getFirstLevelText(words.slice(stringStart, stringEnd).join(' ')));
      }
      else if (words[index] == '<level_2>') {
        stringStart = index+1;
        while(words[index] !== '</level_2>' && count < 500) {
          index++;
          count++;
        }
        stringEnd = index;
        componentList.push(getSecondLevelText(words.slice(stringStart, stringEnd).join(' ')));
      }
      else if (words[index] == '<level_3>') {
        stringStart = index+1;
        while(words[index] !== '</level_3>' && count < 500) {
          index++;
          count++;
        }
        stringEnd = index;
        componentList.push(getThirdLevelText(words.slice(stringStart, stringEnd).join(' ')));
      }
      else if (words[index] == '<level_4>') {
        stringStart = index+1;
        while(words[index] !== '</level_4>' && count < 500) {
          index++;
          count++;
        }
        stringEnd = index;
        componentList.push(getFourthLevelText(words.slice(stringStart, stringEnd).join(' ')));
      }
      index++;
    }
    return (componentList);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
        {sessionConcepts.map((session) => {
        const descriptionComponent = getdescriptionComponent(session.description);
        return (<>
          <Typography variant="h4" gutterBottom>
            {session.title}
          </Typography>
          {session.image && (<Box sx= {{display: 'flex', flexDirection: 'row', 
          flexGrow: 1}}><StyledCardMedia
            component="img"
            image={session.image}
            alt={session.title}
          /></Box>)}
          {descriptionComponent}
          </>)
        })}
      </Box>
    </Container>
  );
}
