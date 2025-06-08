import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

const GetRequestComponent: React.FC = () => {
  const [param, setParam] = useState("");
  const [response, setResponse] = useState("");

  const handleGet = async () => {
    try {
      const res = await axios.get(`/api/endpoint?query=${encodeURIComponent(param)}`);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse("エラーが発生しました");
    }
  };

  return (
    <Box>
      <TextField
        label="クエリ"
        value={param}
        onChange={(e) => setParam(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleGet} sx={{ mt: 2 }}>
        GET送信
      </Button>
      <pre>{response}</pre>
    </Box>
  );
};

export default GetRequestComponent;