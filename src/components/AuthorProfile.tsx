import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
// import Skeleton from '@mui/material/Skeleton';
import { UpskillClubApi } from '../apis';
import { Utils } from '../common';
import { Author, GetAuthorByIdResponse } from './interface';

const renderAuthorProfileLoading = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" marginBottom="5px">
          Loading...
        </Typography>
      </Box>
    </Container>
  );
};

const AuthorProfile = () => {
  const { id } = useParams();

  const [authorProfileData, setAuthorProfileData] = React.useState<Author>();
  const [authorProfileLoading, setAuthorProfileLoading] = React.useState(false);
  const [authorProfilePresent, setAuthorProfilePresent] = React.useState(true);

  React.useEffect(() => {
    if (!id) {
      return undefined;
    }
    const fetchAuthorProfileData = async () => {
      const response = await UpskillClubApi.getAuthorById<GetAuthorByIdResponse>({
        authorId: id,
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
  }, [id]);

  if (authorProfileLoading) {
    return renderAuthorProfileLoading();
  }

  if (!authorProfilePresent) {
    return <div>Author not found</div>;
  }

  return (
    authorProfileData && (
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems="center">
            <Avatar
              src={authorProfileData.image_url || '/static/images/avatar/default.jpg'}
              alt={authorProfileData.name}
              sx={{
                width: 84,
                height: 84,
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
            </Box>
          </Box>
        </Box>
      </Container>
    )
  );
};

export { AuthorProfile };
