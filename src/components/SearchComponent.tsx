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
import axios from "axios";

interface SearchComponentProps {
  onSearch: (result: any) => void;
  placeholder?: string;
  title?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder = "エリア、駅名、物件名などを入力してください",
  title = "物件を検索",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/endpoint", { query: searchQuery });
      onSearch(res.data);
    } catch (err) {
      onSearch({ error: "エラーが発生しました" });
    } finally {
      setLoading(false);
    }
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
        maxWidth: "100%",
        mb: 0,
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
          disabled={!searchQuery.trim() || loading}
          sx={{
            px: 4,
            py: 1.5,
            minWidth: { xs: "100%", sm: "120px" },
            fontWeight: "bold",
          }}
        >
          {loading ? "送信中..." : "検索"}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchComponent;