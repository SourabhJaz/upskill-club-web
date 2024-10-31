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
import { Helmet } from 'react-helmet';

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

const clubValues = [{
    id: '1',
    categoryName: '',
    title: 'One over None',
    outline: 'At Upskill, practical learning matters over numbers',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1730394349/vlikihjqivrzllhjwofo.jpg'
}, {
    id: '2',
    categoryName: '',
    title: 'Inclusion',
    outline: 'At Upskill, learning for all outweighs a few excelling',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1730392017/wze9afbxnvwvcerneqk4.jpg'
}, {
    id: '3',
    categoryName: '',
    title: 'Collaboration',
    outline: 'At Upskill, we believe anyone with knowledge can teach.',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1730392112/c8bjy9fnviclts8wl0wb.jpg'
}, {
    id: '4',
    categoryName: '',
    title: 'Practical Learning',
    outline: 'At Upskill, learning is meant to be lived every day.',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}];

const rules = [{
    id: '1',
    categoryName: '',
    title: 'Rule 1',
    outline: 'Be eternally curious',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '2',
    categoryName: '',
    title: 'Rule 2',
    outline: 'Be humble always',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '3',
    categoryName: '',
    title: 'Rule 3',
    outline: 'Never be a A-Hole',
    image: 'https://res.cloudinary.com/dns4wsdk8/image/upload/v1727371499/curiosity_qbczrx.jpg'
}, {
    id: '4',
    categoryName: '',
    title: 'Rule 4',
    outline: 'Respect everyones time',
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
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
        <Helmet>
          <title>About The Upskill Club</title>
          <meta name="description" content="The Upskill Club is a community of people who come together to learn from each other and upskill." />
          <meta name="keywords" content="Upskill, The Upskill Club, Collaborative Learning, Courses, Online Learning, Community, About" />
          <link rel="canonical" href="https://www.theupskillclub.com/about" />
        </Helmet>
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
        <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
          <p>
            On a bright evening in 2019, Anupam and Manish were working through bugs they'd sent to production at{' '}
            <a href="https://www.urbancompany.com" target="_blank" rel="noopener noreferrer">
              UrbanCompany
            </a>
            .
          </p>
          <p>
            As they resolved issues, they realized there was so much more to learn in tech. UrbanCompany had just adopted a
            microservices architecture - an exciting shift, but one that came with new complexities to master.
          </p>
          <p>
            Anupam casually asked if anyone would be interested in weekly reading sessions focused on "Building Microservices"
            by Sam Newman. To his surprise, several team members eagerly joined.
          </p>
          <p>
            Once they finished the book, the momentum didn't stop. The group wanted to keep learning, so they moved on to
            "Designing Data-Intensive Applications", diving into techniques for handling and creating systems capable of
            managing millions of concurrent requests.
          </p>
          <p>
            These weekend sessions soon became a habit and eventually transformed into a club, expanding beyond tech to
            include topics like personal finance, immunology, and leadership.
          </p>
          <p>
            Over time, the Upskill Club evolved to meet the interests of its members: from those early in their careers seeking
            foundational knowledge to those in middle management aiming to enhance their roles.
          </p>
          <p>
            It was clear that everyone shared a common drive - to keep learning and upskilling in life.
          </p>
          <p>
            And so, the Upskill Club was born from within.
          </p>
        </Typography>
        <Typography variant="h2" gutterBottom>
          Core Values
        </Typography>
        {<Grid container spacing={2} columns={12}>
          {clubValues.map((course) => {
            return (
              <Grid size={{ xs: 12, md: 3 }} key={course.id}>
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
            {rules.map((article, index) => (
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
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <CardMedia
                component="img"
                alt="green iguana"
                image="https://res.cloudinary.com/dns4wsdk8/image/upload/v1727441132/unlocking_soon_kosp6f.jpg"
                aspect-ratio="16 / 9"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            />
          </Box>
    </Box>
  );
}