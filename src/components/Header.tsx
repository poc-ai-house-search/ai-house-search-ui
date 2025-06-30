import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

const Header: React.FC = () => (
  <AppBar 
    position="static"
    sx={{
      width: "100%",
      margin: 0,
      padding: 0,
    }}
  >
    <Toolbar
      sx={{
        width: "100%",
        maxWidth: "100%",
        px: { xs: 2, md: 3 },
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        次の住処
      </Typography>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>

      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;