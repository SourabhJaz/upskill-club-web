import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { UpskillClubApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import { GetSessionsResponse, ParsedArticle } from './interface';
import { Utils } from '../common';
import { Author } from './Author';

// Styling components
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
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
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
  },
  '&:hover::before': {
    width: '100%',
  },
}));

export default function Latest(props: { courseId?: string; title: string; style?: React.CSSProperties }) {
  const { courseId, title, style } = props;

  const [articleInfo, setArticleInfo] = React.useState<ParsedArticle[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const navigate = useNavigate();

  const fetchArticleInfo = async (page = 1) => {
    const offset = (page - 1) * 10;
    const response = await UpskillClubApi.getSessions<GetSessionsResponse>({ offset, courseId });
    if (Utils.isErrorResponse(response)) {
      return undefined;
    }
    const { data } = response;
    const articles = data.results.map((article) => ({
      id: article.id,
      tag: article.course.title,
      title: article.title,
      description: article.outline,
      authors: [
        {
          name: article.author.name,
          avatar: article.author.thumbnail || '/static/images/avatar/default.jpg',
        },
      ],
      createdAt: article.created_at,
    }));
    setArticleInfo(articles);
    setTotalCount(data.count);
  };

  React.useEffect(() => {
    fetchArticleInfo(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
    navigate(`/session/${index}`);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div style={style}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {articleInfo.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(article.id)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: '1rem' }} />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>
              <Author authors={article.authors} createdAt={article.createdAt} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination
          count={Math.ceil(totalCount / 10)}
          page={currentPage}
          onChange={handlePageChange}
          hidePrevButton
          hideNextButton
        />
      </Box>
    </div>
  );
}
