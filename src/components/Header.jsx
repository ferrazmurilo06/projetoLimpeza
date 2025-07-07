import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  List as ListIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Info as InfoIcon
} from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Cadastro', icon: <PersonAddIcon />, path: '/cadastro' },
  { text: 'Lista de Produtos', icon: <ListIcon />, path: '/produtos' },
  { text: 'Sobre', icon: <InfoIcon />, path: '/sobre' },
  { text: 'Contato', icon: <PhoneIcon />, path: '/contato' }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount] = useState(3);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const drawer = (
    <div>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Limpeza Fácil</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              backgroundColor: location.pathname === item.path ? 'rgba(0,0,0,0.1)' : 'transparent'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Meu Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton 
              color="inherit" 
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              textDecoration: 'none',
              color: 'inherit',
              mr: isMobile ? 0 : 4
            }}
          >
            🧴 Limpeza Fácil
          </Typography>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '8px', flexGrow: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </div>
          )}

          {!isMobile && (
            <div style={{ margin: '0 16px' }}>
              <InputBase 
                placeholder="Buscar produtos..." 
                sx={{
                  color: 'inherit',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.25)'
                  }
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            )}

            <IconButton color="inherit">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      {renderMenu}
    </>
  );
}
