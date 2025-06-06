import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import SearchComponent from "../components/SearchComponent";

interface PropertyResult {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
}

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<PropertyResult[]>([]);

  const handleSearch = (query: string) => {
    console.log("検索クエリ:", query);
    
    // 仮の検索結果データ（実際のAPIレスポンスをシミュレート）
    const mockResults: PropertyResult[] = [
      {
        id: 1,
        title: `${query}周辺のマンション A`,
        description: "築5年、駅徒歩3分の好立地マンションです。",
        price: "15万円/月",
        location: "東京都渋谷区"
      },
      {
        id: 2,
        title: `${query}エリアのアパート B`,
        description: "リノベーション済み、設備充実のアパートです。",
        price: "12万円/月",
        location: "東京都新宿区"
      },
      {
        id: 3,
        title: `${query}近くの一戸建て C`,
        description: "庭付き一戸建て、ファミリー向けです。",
        price: "25万円/月",
        location: "東京都世田谷区"
      },
      {
        id: 4,
        title: `${query}付近のマンション D`,
        description: "新築、オートロック完備のセキュリティマンション。",
        price: "18万円/月",
        location: "東京都港区"
      },
      {
        id: 5,
        title: `${query}エリアのデザイナーズ E`,
        description: "デザイナーズアパート、おしゃれな内装です。",
        price: "14万円/月",
        location: "東京都目黒区"
      },
      {
        id: 6,
        title: `${query}周辺のファミリー向け F`,
        description: "3LDK、子育て世帯におすすめの物件です。",
        price: "22万円/月",
        location: "東京都品川区"
      }
    ];
    
    setSearchResults(mockResults);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)", // ヘッダーとフッターを除いた高さ
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
          {/* 検索窓エリア */}
          <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
            <SearchComponent 
              onSearch={handleSearch}
              title="物件を検索"
            />
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
                検索結果の1番目がここに表示されます
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
                    検索結果がここに表示されます
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
                検索結果の2番目がここに表示されます
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
                    検索結果がここに表示されます
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* 右側：検索結果表示エリア（水色部分） */}
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
              検索結果表示エリア
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              検索を実行すると物件情報がここに表示されます
            </Typography>
          </Box>
          
          {/* 検索結果リスト */}
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
                {searchResults.map((result) => (
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
                  検索結果がここに表示されます
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