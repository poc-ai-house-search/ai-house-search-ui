import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      px: 2,
      backgroundColor: "#f5f5f5",
      textAlign: "center",
      width: "100%",
    }}
  >
    <Typography variant="body2" color="text.secondary">
      <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
        利用規約
      </Link>
      |
      <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
        プライバシーポリシー
      </Link>
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      &copy; {new Date().getFullYear()} AIハウス検索
    </Typography>
  </Box>
);

export default Footer;