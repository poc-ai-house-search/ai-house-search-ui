import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchComponentProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  title?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder = "エリア、駅名、物件名などを入力してください",
  title = "物件を検索",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: "100%",
        maxWidth: "100%", // 左側エリアに合わせて幅を調整
        mb: 0, // マージンボトムを削除（親で制御）
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          fontWeight: "medium",
        }}
      >
        {title}
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
        
        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          disabled={!searchQuery.trim()}
          sx={{
            px: 4,
            py: 1.5,
            minWidth: { xs: "100%", sm: "120px" },
            fontWeight: "bold",
          }}
        >
          検索
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchComponent;