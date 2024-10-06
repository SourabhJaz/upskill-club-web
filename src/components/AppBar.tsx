import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Sitemark from './SitemarkIcon';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  padding: '8px 16px',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: 'none',
  backgroundColor: theme.palette.background.default,
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        borderBottom: 1,
        borderBottomColor: 'divider',
      }}
    >
      <StyledToolbar variant="dense" disableGutters>
        <Sitemark />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            variant="text"
            color="inherit"
            size="medium"
            onClick={() => navigate(`/`)}
            sx={{ color: 'text.secondary' }}
          >
            <Typography>Home</Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="medium"
            onClick={() => navigate(`/about`)}
            sx={{ color: 'text.secondary' }}
          >
            <Typography>About</Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="medium"
            sx={{ minWidth: 0, color: 'text.secondary' }}
            onClick={() => window.open('https://github.com/SourabhJaz/upskill-club-web/tree/main', '_blank')}
          >
            <Typography>Github</Typography>
          </Button>
        </Box>
        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
          <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: '70%',
              },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'background.default', height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                <IconButton onClick={toggleDrawer(false)} sx={{ paddingTop: 0 }}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
              <Divider sx={{ paddingTop: 1, marginBottom: 1 }} />
              <MenuItem onClick={() => navigate(`/`)}>
                <Typography color="text.secondary">HOME</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`/about`)}>
                <Typography color="text.secondary">ABOUT</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => window.open('https://github.com/SourabhJaz/upskill-club-web/tree/main', '_blank')}
              >
                <Typography color="text.secondary">GITHUB</Typography>
              </MenuItem>
            </Box>
          </Drawer>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
}
