import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { UpskillClubApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import { GetSessionsResponse, ParsedArticle } from './interface';
import { Utils } from '../common';
import { Author } from './Author';

// Styling components
const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    cursor: 'pointer',
  },
  boxShadow: 'none',
  backgroundImage: 'none',
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 0,
  marginBottom: 4,
  flexGrow: 1,
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

const renderSessionsLoading = () => {
  return (
    <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
      {[1, 2, 3, 4].map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6 }}>
          <div>
            <Skeleton width="30%" sx={{ marginBottom: 1 }} />
            <Skeleton sx={{ marginBottom: 1 }} />
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
        </Grid>
      ))}
    </Grid>
  );
};

export default function Latest(props: {
  courseId?: string;
  authorId?: string;
  title: string;
  style?: React.CSSProperties;
  order?: string;
}) {
  const { courseId, authorId, title, style, order } = props;

  const [articleInfo, setArticleInfo] = React.useState<ParsedArticle[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [sessionsLoading, setSessionsLoading] = React.useState(false);
  const navigate = useNavigate();

  const fetchArticleInfo = async (page = 1) => {
    const offset = (page - 1) * 10;
    const response = await UpskillClubApi.getSessions<GetSessionsResponse>({ offset, courseId, authorId, order });
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
          id: article.author.id,
          name: article.author.name,
          avatar: Utils.getThumbnailCloudinaryUrl(article.author.image_url),
        },
      ],
      createdAt: article.created_at,
    }));
    setArticleInfo(articles);
    setTotalCount(data.count);
    setSessionsLoading(false);
  };

  React.useEffect(() => {
    setSessionsLoading(true);
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
      {sessionsLoading ? (
        renderSessionsLoading()
      ) : (
        <React.Fragment>
          <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
            {articleInfo.map((article, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <SyledCard onClick={() => navigate(`/session/${article.id}`)}>
                  <SyledCardContent>
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
                  </SyledCardContent>
                  <Author
                    authors={article.authors}
                    createdAt={article.createdAt}
                    styleProps={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  />
                </SyledCard>
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
        </React.Fragment>
      )}
    </div>
  );
}
