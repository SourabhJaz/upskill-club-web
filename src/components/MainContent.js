import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';

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

const getFormattedDate = (dateStr) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString('en-US', options)
}

function Author({ authors, createdAt }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.thumbnail}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">{getFormattedDate(createdAt)}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export function Search({ onSearch }) {
  const [searchItem, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = (event) => {
    if(event.keyCode == 13)
      handleSearch();
  }
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

export default function MainContent() {
  const defaultCategory = {
    id: 0,
    name: 'ALL CATEGORIES'
  };
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [categories, setCategories] = React.useState([defaultCategory]);
  const [selectedCategory, selectCategory] = React.useState(defaultCategory.id);
  const [courses, setCourses] = React.useState([]);
  const [searchItem, setSearchItem] = React.useState('');
  const navigate = useNavigate();
  
  React.useEffect(() => {
      const populateCategories = async() => {
        try {    
          const response = await fetch('https://sourabhjaz.pythonanywhere.com/api/category/');
          const parsedResponse = await response.json();  
          setCategories([defaultCategory, ...parsedResponse.results])
        } catch (err) {
      console.log(err);
      }
    }
    populateCategories();
  }, []);

  React.useEffect(() => {
    const populateCourses = async() => {
      try {
        const url = new URL('https://sourabhjaz.pythonanywhere.com/api/course');
        if(searchItem) {
          url.searchParams.append('search', searchItem);
        }
        if (selectedCategory) {
          url.searchParams.append('category', selectedCategory);
        }
        const response = await fetch(url.toString());
        const parsedResponse = await response.json(); 
        setCourses(parsedResponse.results);
      } catch (err) {
        console.log(err);
      }
    }
    populateCourses();
  }, [selectedCategory, searchItem]);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = (index) => {
    selectCategory(index);
  };
  const handleSearch = (term) => {
    setSearchItem(term);
  };
  
  const handleCourseClick = (courseId) => {
    navigate(`/upskill-club-web/course/${courseId}`); // Navigate to the course details page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Upskill Club
        </Typography>
        <Typography>
          A collaborative learning club started by <a href="https://www.linkedin.com/in/anupamsingh0211/" title="Anupam Singh" target='_blank'>Anupam Singh</a> in 2021.
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          {categories.map((category) => {
            return (<Chip key={category.id} onClick={handleClick.bind(this, category.id)} size="medium" 
            sx={{
              border: 'none',
            }}
            variant={category.id == selectedCategory?'filled':'outlined'}
            clickable
            label={category.name} />)
          })}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search onSearch={handleSearch} />
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {courses.map((course) => {
          return (<Grid size={{ xs: 12, md: 6 }} key={course.id}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)}
              onBlur={handleBlur}
              onClick={() => handleCourseClick(course.id)} // Navigate to course details page
              className={focusedCardIndex === course.id ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={course.image}
                aspect-ratio="16 / 9"
                sx={{
                  width: '100%',
                  height: 325,
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {course.category.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {course.title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {course.outline}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={[course.author]} createdAt={course.created_at} />
            </SyledCard>
          </Grid>)
          }
        )}
      </Grid>
    </Box>
  );
}
