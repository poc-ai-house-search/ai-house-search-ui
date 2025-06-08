import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

const PostRequestComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handlePost = async () => {
    try {
      const res = await axios.post("/api/endpoint", { query: input });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse("エラーが発生しました");
    }
  };

  return (
    <Box>
      <TextField
        label="クエリ"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handlePost} sx={{ mt: 2 }}>
        POST送信
      </Button>
      <pre>{response}</pre>
    </Box>
  );
};

export default PostRequestComponent;