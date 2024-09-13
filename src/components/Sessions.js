import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: '#fff',
});

const StyledCardContent = styled(CardContent)({
  padding: 16,
});

const StyledCardMedia = styled(CardMedia)({
  height: 180,
  objectFit: 'cover',
});

export default function Sessions({ courseId }) {
  const [sessions, setSessions] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchSessions = async () => {
      try {
        const url = new URL('https://sourabhjaz.pythonanywhere.com/api/session');
        url.searchParams.append('page', page);
        if (courseId) {
          url.searchParams.append('course', courseId);
        }
        const response = await fetch(url.toString());
        const data = await response.json();
        const sessions = data.results.map(article => ({
          tag: article.course.title,
          title: article.title,
          description: article.outline,
          authors: [{
            name: article.course.author.name,
            avatar: article.course.author.thumbnail || '/static/images/avatar/default.jpg',
          }],
          createdAt: article.created_at,
        }));  
        setSessions(sessions);
        setTotalPages(data.total_pages); // Adjust according to your API's pagination response
      } catch (err) {
        console.log(err);
      }
    };
    fetchSessions();
  }, [courseId, page]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sessions
      </Typography>
      <Grid container spacing={2}>
        {sessions.map((session) => (
          <Grid item xs={12} md={6} key={session.id}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={session.image}
                alt={session.title}
              />
              <StyledCardContent>
                <Typography variant="h6" gutterBottom>
                  {session.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {session.description}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}
