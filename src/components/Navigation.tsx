import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

// ✅ am adăugat "Certifications"
const navItems: [string, string][] = [
  ['Expertise', 'expertise'],
  ['Certifications', 'certifications'],
  ['History', 'history'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
];

type Props = {
  parentToChild: { mode: 'dark' | 'light' };
  modeChange: (next?: 'dark' | 'light') => void;
};

function Navigation({ parentToChild, modeChange }: Props) {
  const { mode } = parentToChild;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (!navbar) return;
      setScrolled(window.scrollY > navbar.clientHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // dacă suntem pe mobil, închidem meniul după click
      if (mobileOpen) setMobileOpen(false);
    } else {
      console.error(`Element with id "${sectionId}" not found`);
    }
  };

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <p className="mobile-menu-top"><ListIcon />Menu</p>
      <Divider />
      <List>
        {navItems.map(([label, id]) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={(e) => {
                e.stopPropagation(); // prevenim re-toggle inutil
                scrollToSection(id);
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className='navigation-bar'>
          {/* Buton meniu (mobil) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Toggle dark/light */}
          {mode === 'dark'
            ? <LightModeIcon onClick={() => modeChange()} />
            : <DarkModeIcon onClick={() => modeChange()} />}

          {/* Linkuri navbar (desktop) */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(([label, id]) => (
              <Button key={id} onClick={() => scrollToSection(id)} sx={{ color: '#fff' }}>
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer mobil */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
