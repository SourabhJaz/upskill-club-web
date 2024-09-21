import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ParsedAuthor } from './interface';
import { Utils } from '../common';

const Author = (props: { authors: ParsedAuthor[]; createdAt: string }) => {
  const { authors, createdAt } = props;
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
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
      </Box>
      <Typography variant="caption">{Utils.getFormattedDate(createdAt)}</Typography>
    </Box>
  );
};

export { Author };
