import * as React from 'react';
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
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { ParsedCourse } from '../entities/interface';
import { DEFAULT_CATEGORY } from './constants';
import { Author } from './Author';
import { EntityParser } from '../entities';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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

export function Search({ onSearch }: { onSearch: (searchItem: string) => void }) {
  const [searchItem, setSearchTerm] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
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

const renderLoadingCourse = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
      <Skeleton height="60%" variant="rounded" />
      <Skeleton height="25%" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '15%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%' }}>
          <Skeleton variant="circular" width={40} height={30} />
          <Skeleton width="100%" style={{ margin: '5%' }} />
        </div>
        <Skeleton width="20%" />
      </div>
    </div>
  );
};

const renderCoursesLoading = () => {
  const loadingCourses = [{ id: '1' }, { id: '2' }];

  return (
    <Grid container spacing={2} columns={12}>
      {loadingCourses.map((course) => {
        return (
          <Grid size={{ xs: 12, md: 6 }} key={course.id}>
            {renderLoadingCourse()}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number>();
  const [categories, setCategories] = React.useState([DEFAULT_CATEGORY]);
  const [selectedCategory, selectCategory] = React.useState(DEFAULT_CATEGORY.id);
  const [courses, setCourses] = React.useState<ParsedCourse[]>([]);
  const [coursesLoading, setCoursedLoading] = React.useState(false);
  const [searchItem, setSearchItem] = React.useState('');
  const [courseImagesLoaded, setCourseImagesLoaded] = React.useState<boolean[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const populateCategories = async () => {
      const response = await UpskillClubApi.getCategories();
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      setCategories([DEFAULT_CATEGORY, ...response.data.results]);
    };
    populateCategories();
  }, []);

  React.useEffect(() => {
    const populateCourses = async () => {
      const response = await UpskillClubApi.getCourses({
        searchItem,
        category: selectedCategory,
      });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      const { data } = response;
      const parsedCourses = data.results.map((course) => EntityParser.getParsedCourse(course));
      const courseImageLoading = parsedCourses.map(() => false);
      setCourseImagesLoaded(courseImageLoading);
      setCourses(parsedCourses);
      setCoursedLoading(false);
    };
    setCoursedLoading(true);
    populateCourses();
  }, [selectedCategory, searchItem]);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(undefined);
  };

  const handleCategoryClick = (index: number) => {
    selectCategory(index);
  };

  const handleSearch = (term: string) => {
    setSearchItem(term);
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/course?courseId=${courseId}`);
  };

  const updateCourseImageLoading = (idx: number) => {
    setCourseImagesLoaded((currentState) => {
      return currentState.map((value, index) => {
        if (idx === index) {
          return true;
        }
        return value;
      });
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h1" gutterBottom>
        The Upskill Club
      </Typography>
      <Typography variant="body1" gutterBottom>
        A catalog of notes on courses being discussed within a collaborative community called{' '}
        <ReactRouterLink to="/about" target="_blank" rel="noopener noreferrer">
          The Upskill Club
        </ReactRouterLink>
      </Typography>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search onSearch={handleSearch} />
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
            return (
              <Chip
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                size="medium"
                sx={{
                  border: 'none',
                }}
                variant={category.id == selectedCategory ? 'filled' : 'outlined'}
                clickable
                label={category.name}
              />
            );
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
      {coursesLoading ? (
        renderCoursesLoading()
      ) : (
        <Grid container spacing={2} columns={12}>
          {courses.map((course, idx) => {
            return (
              <Grid size={{ xs: 12, md: 6 }} key={course.id}>
                <SyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(course.id)}
                  onBlur={handleBlur}
                  onClick={() => handleCourseClick(course.id)}
                  className={focusedCardIndex === course.id ? 'Mui-focused' : ''}
                >
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={325}
                    sx={{
                      display: courseImagesLoaded[idx] ? 'none' : 'block',
                    }}
                  />
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
                      display: courseImagesLoaded[idx] ? 'block' : 'none',
                    }}
                    onLoad={() => updateCourseImageLoading(idx)}
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
                  <Author authors={course.authors} createdAt={course.createdAt} />
                </SyledCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
