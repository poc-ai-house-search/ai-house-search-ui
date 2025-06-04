import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          width: "100vw",
          overflowX: "hidden",
        },
        html: {
          margin: 0,
          padding: 0,
        },
        "#root": {
          margin: 0,
          padding: 0,
          width: "100vw",
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            width: "100vw",
            maxWidth: "100vw",
            overflowX: "hidden",
            position: "relative",
            left: 0,
            right: 0,
            "& .MuiBox-root": {
              margin: 0,
              padding: 0,
            },
          }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flex: 1,
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 4 },
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              {/* 他のルートもここに追加できます */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;