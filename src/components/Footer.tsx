import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as ReactRouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" target="_blank" href="https://www.linkedin.com/company/theupskillclub">
        The Upskill Club
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Link
              color="text.secondary"
              variant="body2"
              sx={{
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <ReactRouterLink to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </ReactRouterLink>
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
            <Link
              color="text.secondary"
              variant="body2"
              sx={{
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <ReactRouterLink to="/terms-of-service" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </ReactRouterLink>
            </Link>
            <Copyright />
          </div>
          <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: 'left', color: 'text.secondary' }}>
            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://github.com/SourabhJaz/upskill-club-web/"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              target="_blank"  
              href="https://www.linkedin.com/company/theupskillclub"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
