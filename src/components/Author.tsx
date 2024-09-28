import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ParsedAuthor } from '../entities/interface';
import { Utils } from '../common';
import { SxProps, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Author = (props: { authors: ParsedAuthor[]; createdAt: string; styleProps?: SxProps<Theme> }) => {
  const { authors, createdAt, styleProps } = props;

  const boxStyleProps: SxProps<Theme> = styleProps ?? {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
  };

  return (
    <Box sx={boxStyleProps}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 30, height: 30 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
      </Box>
      <Typography variant="caption">{Utils.getFormattedDate(createdAt)}</Typography>
    </Box>
  );
};

const AuthorCard = (props: { authors: ParsedAuthor[]; createdAt: string; styleProps?: SxProps<Theme> }) => {
  const { authors, createdAt, styleProps } = props;
  const navigate = useNavigate();

  const boxStyleProps: SxProps<Theme> = styleProps ?? {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
  };

  return (
    <Box sx={boxStyleProps}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 44, height: 44, '&:hover': { cursor: 'pointer', opacity: 0.9 } }}
              onClick={() => navigate(`/author/${author.id}`)}
            />
          ))}
        </AvatarGroup>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {authors.map((author, index) => {
              return (
                <Typography
                  key={`{authorcard_${author.name}}`}
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
                    fontWeight: 'medium',
                  }}
                  onClick={() => navigate(`/author/${author.id}`)}
                >
                  {index === authors.length - 1 ? (
                    <span>{author.name}</span>
                  ) : (
                    <span style={{ marginRight: 2 }}>{`${author.name},`}</span>
                  )}
                </Typography>
              );
            })}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {Utils.getFormattedDate(createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { Author, AuthorCard };
