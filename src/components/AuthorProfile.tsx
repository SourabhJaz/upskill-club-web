import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Skeleton from '@mui/material/Skeleton';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { Author, GetAuthorByIdResponse } from './interface';
import Latest from './Latest';

const renderAuthorProfileLoading = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={4}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems="center">
          <Skeleton variant="circular" height={152} width={152} sx={{ marginRight: 2 }} />
          <Box>
            <Skeleton variant="rectangular" height={125} width={304} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const AuthorProfile = () => {
  const { id: authorId } = useParams();

  const [authorProfileData, setAuthorProfileData] = React.useState<Author>();
  const [authorProfileLoading, setAuthorProfileLoading] = React.useState(false);
  const [authorProfilePresent, setAuthorProfilePresent] = React.useState(true);

  React.useEffect(() => {
    if (!authorId) {
      return undefined;
    }
    const fetchAuthorProfileData = async () => {
      const response = await UpskillClubApi.getAuthorById<GetAuthorByIdResponse>({
        authorId,
      });
      if (Utils.isErrorResponse(response)) {
        return undefined;
      }
      const { data } = response;
      if ('id' in data) {
        setAuthorProfileData(data);
        setAuthorProfilePresent(true);
      } else {
        setAuthorProfilePresent(false);
      }
      setAuthorProfileLoading(false);
    };
    setAuthorProfileLoading(true);
    fetchAuthorProfileData();
  }, [authorId]);

  if (authorProfileLoading) {
    return renderAuthorProfileLoading();
  }

  if (!authorProfilePresent) {
    return <div>Author not found</div>;
  }

  return (
    authorProfileData && (
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={4}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems="center">
            <Avatar
              src={authorProfileData.image_url || '/static/images/avatar/default.jpg'}
              alt={authorProfileData.name}
              sx={{
                width: 152,
                height: 152,
                marginRight: 2,
              }}
            >
              {authorProfileData.image_url ? undefined : Utils.getAuthorInitials(authorProfileData.name)}
            </Avatar>
            <Box>
              <Typography variant="h3" marginBottom="5px">
                {authorProfileData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom fontStyle="italic">
                {`${authorProfileData.outline}`}
              </Typography>
              {authorProfileData.linkedin_url && (
                <IconButton sx={{ padding: 0 }} onClick={() => Utils.openInNewTab(authorProfileData.linkedin_url!)}>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box>
            <Latest title="Latest Sessions" authorId={authorId} />
          </Box>
        </Box>
      </Container>
    )
  );
};

export { AuthorProfile };
