import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, TextField, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

interface PropertyResult {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
}

interface ApiResponse {
  // APIレスポンスの型定義（実際のレスポンス構造に合わせて調整してください）
  result?: any;
  data?: any;
  [key: string]: any;
}

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<PropertyResult[]>([]);
  const [query, setQuery] = useState("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async () => {
    if (!query.trim()) {
      setError("クエリを入力してください");
      return;
    }

    setLoading(true);
    setError(null);
    setApiResponse(null);

    // 環境変数からAPIベースURLを取得
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ai-backend-464341659510.asia-northeast1.run.app';
    const apiEndpoint = `${apiBaseUrl}/api/analyze`;

    console.log('API Endpoint:', apiEndpoint); // デバッグ用ログ

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          query: query,
          enable_compression: false,
          compression_ratio: 0.6
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30秒のタイムアウト
        }
      );

      setApiResponse(response.data);
      
      // APIレスポンスから検索結果を生成（実際のAPIレスポンス構造に合わせて調整）
      const mockResults: PropertyResult[] = [
        {
          id: 1,
          title: `解析結果: ${query}`,
          description: "API解析完了",
          price: "解析データ",
          location: "結果表示"
        }
      ];
      
      setSearchResults(mockResults);
    } catch (err: any) {
      console.error("API呼び出しエラー:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "API呼び出しでエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  // handleSearch関数は現在未使用のため削除
  // 将来的にSearchComponentを使用する場合は復活させてください

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* メインコンテンツエリア */}
      <Box sx={{ flex: 1, display: "flex" }}>
        {/* 左側：検索エリア */}
        <Box
          sx={{
            width: "50%",
            borderRight: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* API呼び出しエリア */}
          <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}>
              物件解析API
            </Typography>
            
            <TextField
              label="解析する不動産URL"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              multiline
              rows={2}
              placeholder="https://www.homes.co.jp/archive/b-9800554/"
              sx={{ mb: 2 }}
              disabled={loading}
            />
            
            <Button 
              variant="contained" 
              onClick={handleApiCall} 
              disabled={loading || !query.trim()}
              sx={{ 
                width: "100%",
                height: 48,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  解析中...
                </>
              ) : (
                "解析実行"
              )}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
          
          {/* 左側上部：検索結果エリア */}
          <Box
            sx={{
              height: "50%",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f8f9fa",
              }}
            >
              <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                検索結果 1
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                API解析結果の1番目がここに表示されます
              </Typography>
            </Box>
            
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 2,
                backgroundColor: "#ffffff",
              }}
            >
              {searchResults.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {searchResults.slice(0, Math.ceil(searchResults.length / 4)).map((result) => (
                    <Card 
                      key={result.id} 
                      sx={{ 
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                          transform: "translateY(-1px)",
                          transition: "all 0.2s ease-in-out"
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1, color: "#1976d2" }}>
                          {result.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                          {result.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            📍 {result.location}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                            {result.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                    }}
                  >
                    API解析結果がここに表示されます
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* 左側下部：検索結果エリア */}
          <Box
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f8f9fa",
              }}
            >
              <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                検索結果 2
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                API解析結果の2番目がここに表示されます
              </Typography>
            </Box>
            
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 2,
                backgroundColor: "#ffffff",
              }}
            >
              {searchResults.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {searchResults.slice(Math.ceil(searchResults.length / 4), Math.ceil(searchResults.length / 2)).map((result) => (
                    <Card 
                      key={result.id} 
                      sx={{ 
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                          transform: "translateY(-1px)",
                          transition: "all 0.2s ease-in-out"
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1, color: "#1976d2" }}>
                          {result.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                          {result.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            📍 {result.location}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                            {result.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                    }}
                  >
                    API解析結果がここに表示されます
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* 右側：APIレスポンス表示エリア */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
              APIレスポンス表示エリア
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              API解析の詳細な結果がここに表示されます
            </Typography>
          </Box>
          
          {/* APIレスポンス表示 */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              backgroundColor: "#ffffff",
            }}
          >
            {apiResponse ? (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
                  解析完了
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 2,
                    maxHeight: "400px",
                    overflow: "auto",
                  }}
                >
                  <pre style={{ 
                    margin: 0, 
                    whiteSpace: "pre-wrap", 
                    wordBreak: "break-word",
                    fontSize: "12px",
                    fontFamily: "monospace"
                  }}>
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  {loading ? "解析中..." : "API解析結果がここに表示されます"}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;