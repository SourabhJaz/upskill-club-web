import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_UPSKILL_CATEGORY } from './constants';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '3px',
      borderRadius: '8px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: '1px',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.text.primary,
      opacity: 0.3,
      transition: 'width 0.3s ease, opacity 0.3s ease',
    }
  }));

const courses = [{
    id: '1',
    categoryName: '',
    title: 'Value 1',
    outline: 'Encourages value 1',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '2',
    categoryName: '',
    title: 'Value 2',
    outline: 'Encourages value 2',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '3',
    categoryName: '',
    title: 'Value 3',
    outline: 'Encourages value 3',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '4',
    categoryName: '',
    title: 'Value 4',
    outline: 'Encourages value 4',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}];

const articles = [{
    id: '1',
    categoryName: '',
    title: 'Rule 1',
    outline: 'Be curious',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '2',
    categoryName: '',
    title: 'Rule 2',
    outline: 'Be humble',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '3',
    categoryName: '',
    title: 'Rule 3',
    outline: 'Rule 3',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '4',
    categoryName: '',
    title: 'Rule 4',
    outline: 'Rule 4',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}];

export function Search({ onSearch }) {
  const [searchItem, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode == 13) handleSearch();
  };
  const handleSearch = () => {
    onSearch(searchItem);
  };
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" onClick={handleSearch} />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}


export default function About() {
  const navigate = useNavigate();



  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`); // Navigate to the course details page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
        <Typography variant="h2" gutterBottom>
          Inception of The Upskill Club
        </Typography>
        <CardMedia
            component="img"
            alt="green iguana"
            image="https://res.cloudinary.com/dns4wsdk8/image/upload/v1727368120/about_banner_rrizfb.jpg"
            aspect-ratio="16 / 9"
            sx={{
                width: '100%',
                height: 325,
                objectFit: 'cover',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        />
        <Typography variant="body1" gutterBottom>
          Some lines on how it all started as a weekend learning session and then evolved to this club. Some lines on how it all started as a weekend learning session and then evolved to this club.
        </Typography>
        <Typography variant="h2" gutterBottom>
          Core Values
        </Typography>
        {<Grid container spacing={2} columns={12}>
          {courses.map((course, idx) => {
            return (
              <Grid size={{ xs: 6, md: 3 }} key={course.id}>
                <SyledCard
                  variant="outlined"
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={course.image}
                    aspect-ratio="16 / 9"
                    sx={{
                      width: '100%',
                      height: 150,
                      objectFit: 'cover',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <SyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">
                      {course.categoryName}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {course.title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                      {course.outline}
                    </StyledTypography>
                  </SyledCardContent>
                </SyledCard>
              </Grid>
            );
          })}
        </Grid>}
        <Typography variant="h2" gutterBottom>
          Rules to Join
        </Typography>
        <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
            {articles.map((article, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <SyledCard>
                  <SyledCardContent>
                    <TitleTypography
                      gutterBottom
                      variant="h6"
                      tabIndex={0}
                    >
                      {article.title}
                    </TitleTypography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                      {article.outline}
                    </StyledTypography>
                  </SyledCardContent>
                </SyledCard>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h2" gutterBottom>
            How to Join?
          </Typography>
          <SyledCard sx={{height: 300, padding: 16}}>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
          </Box>
          </SyledCard>
    </Box>
  );
}
