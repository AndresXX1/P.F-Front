import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from '../perfilDeUsuario/perfil';
import UserProfileForm from '../perfilDeUsuario/edditProfile';

// Definir tus componentes PeopleComponent, DnsRoundedComponent, PermMediaOutlinedComponent aquí

const drawerWidth = 256;

export default function UserDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('home');
  const isSmUp = useMediaQuery(createTheme().breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <UserProfile />;
      case 'people':
        return <UserProfileForm />;
      case 'compras':
        return <DnsRoundedComponent />;
      case 'medios-de-pago':
        return <PermMediaOutlinedComponent />;
      default:
        return null;
    }
  };

  const PeopleComponent = () => (
    <div style={{ margin: '16px', padding: '16px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ color: '#333' }}>People Component</h2>
      {/* Contenido del componente People */}
    </div>
  );

  const DnsRoundedComponent = () => (
    <div style={{ margin: '16px', padding: '16px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ color: '#333' }}>Compras Component</h2>
      {/* Contenido del componente Compras */}
    </div>
  );

  const PermMediaOutlinedComponent = () => (
    <div style={{ margin: '16px', padding: '16px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ color: '#333' }}>Medios de Pago Component</h2>
      {/* Contenido del componente Medios de Pago */}
    </div>
  );

  const drawer = (
    <Drawer
      variant={isSmUp ? 'permanent' : 'temporary'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: '#101F33',
        borderRight: '1px solid #444',
      }}
    >
      <List>
        <ListItemButton
          onClick={() => handleComponentChange('home')}
          sx={{
            '&:hover, &:focus': {
              backgroundColor: '#2C3E50',
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Tus Datos" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleComponentChange('people')}
          sx={{
            '&:hover, &:focus': {
              backgroundColor: '#2C3E50',
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Configuracion de datos" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleComponentChange('compras')}
          sx={{
            '&:hover, &:focus': {
              backgroundColor: '#2C3E50',
            },
          }}
        >
          <ListItemIcon>
            <DnsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleComponentChange('medios-de-pago')}
          sx={{
            '&:hover, &:focus': {
              backgroundColor: '#2C3E50',
            },
          }}
        >
          <ListItemIcon>
            <PermMediaOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Medios de pago" />
        </ListItemButton>
      </List>
    </Drawer>
  );

  return (
    <ThemeProvider theme={createTheme()}>
      
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {drawer}
        <div style={{ flexGrow: 1, padding: '16px' }}>
          {renderComponent()}
        </div>
      
    </ThemeProvider>
  );
}