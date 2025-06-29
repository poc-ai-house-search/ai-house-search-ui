import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Rating
} from "@mui/material";
import {
  Home as HomeIcon,
  Build,
  Star,
  Train,
  CheckCircle,
  Warning
} from "@mui/icons-material";
import axios from "axios";

interface BasicInfo {
  property_name: string | null;
  address: string;
  room_number: string | null;
  rent: string;
  management_fee: string | null;
  deposit: string;
  key_money: string;
  area: string;
  layout: string;
  building_age: string;
  floor: string;
  direction: string | null;
  building_type: string;
}

interface Station {
  line: string;
  station: string;
  walking_time: string;
}

interface Analysis {
  basic_info: BasicInfo;
  features: {
    amenities: string[];
    equipment: string[];
    special_features: string[];
  };
  location: {
    nearest_stations: Station[];
    surrounding_environment: string | null;
  };
  evaluation: {
    advantages: string[];
    disadvantages: string[];
    overall_rating: number;
    recommendation_score: string;
    summary: string;
  };
  financial_analysis?: {
    financial_status: string;
    overall_score: number | null;
    analysis_summary: string;
    positive_factors: string[];
    negative_factors: string[];
    financial_indicators: {
      revenue_total: string;
      expenditure_total: string;
      debt_ratio: string;
    };
    data_reliability: {
      data_sources: number;
      confidence_level: string;
      search_successful: boolean;
      vertex_ai_search_used: boolean;
    };
    vertex_ai_search_summary: string;
    search_metadata: {
      search_successful: boolean;
      results_count: number;
      api_type: string;
    };
  };
}

interface ApiResponse {
  uuid: string;
  query: string;
  analysis: Analysis;
  [key: string]: any;
}

const Home: React.FC = () => {
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

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ai-backend-464341659510.asia-northeast1.run.app';
    const apiEndpoint = `${apiBaseUrl}/api/analyze`;

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
            'Accept': 'application/json',
          },
          timeout: 30000,
        }
      );

      setApiResponse(response.data);
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

  const formatPrice = (price: string | null) => {
    if (!price) return "－";
    const num = parseInt(price);
    return `¥${num.toLocaleString()}`;
  };

  // 基本情報コンポーネント
  const PropertyBasicInfo = ({ basicInfo }: { basicInfo: BasicInfo }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon color="primary" />
          基本情報
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "120px", bgcolor: "#f8f9fa" }}>住所</TableCell>
                <TableCell>{basicInfo.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>賃料</TableCell>
                <TableCell sx={{ color: "error.main", fontWeight: "bold", fontSize: "1.2em" }}>
                  {formatPrice(basicInfo.rent)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>敷金</TableCell>
                <TableCell>{formatPrice(basicInfo.deposit)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>礼金</TableCell>
                <TableCell>{formatPrice(basicInfo.key_money)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>間取り</TableCell>
                <TableCell>{basicInfo.layout}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>専有面積</TableCell>
                <TableCell>{basicInfo.area}m²</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>築年数</TableCell>
                <TableCell>{basicInfo.building_age}年</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>階数</TableCell>
                <TableCell>{basicInfo.floor}階</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>建物種別</TableCell>
                <TableCell>{basicInfo.building_type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  // アクセス情報コンポーネント
  const LocationInfo = ({ location }: { location: Analysis['location'] }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Train color="primary" />
          アクセス情報
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>路線</TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>駅名</TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f8f9fa" }}>徒歩</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {location.nearest_stations.map((station, index) => (
                <TableRow key={index}>
                  <TableCell>{station.line}</TableCell>
                  <TableCell>{station.station}</TableCell>
                  <TableCell>{station.walking_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  // 設備・特徴コンポーネント
  const FeatureInfo = ({ features }: { features: Analysis['features'] }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Build color="primary" />
          設備・特徴
        </Typography>
        
        {features.amenities.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#1976d2" }}>
              設備・アメニティ
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {features.amenities.map((amenity, index) => (
                <Chip 
                  key={index} 
                  label={amenity} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {features.special_features.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#7b1fa2" }}>
              特別な特徴
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {features.special_features.map((feature, index) => (
                <Chip 
                  key={index} 
                  label={feature} 
                  size="small" 
                  color="secondary" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // 総合評価コンポーネント
  const EvaluationInfo = ({ evaluation, financialAnalysis }: { 
    evaluation: Analysis['evaluation'], 
    financialAnalysis?: Analysis['financial_analysis'] 
  }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Star color="primary" />
          総合評価
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>総合評価</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={evaluation.overall_rating} readOnly size="large" />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
              {evaluation.recommendation_score}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
          物件総評
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, p: 1.5, bgcolor: "grey.50", borderRadius: 1, lineHeight: 1.6 }}>
          {evaluation.summary}
        </Typography>

        {/* 財政分析情報を追加 */}
        {financialAnalysis && financialAnalysis.vertex_ai_search_summary && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#1976d2" }}>
              地域財政分析
            </Typography>
            <Box sx={{ mb: 2, p: 1.5, bgcolor: "#e3f2fd", borderRadius: 1, maxHeight: "300px", overflow: "auto" }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {financialAnalysis.vertex_ai_search_summary}
              </Typography>
            </Box>

            {financialAnalysis.data_reliability && (
              <Box sx={{ mb: 2, p: 1, bgcolor: "warning.50", borderRadius: 1, border: "1px solid #ffcc02" }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  データ信頼性: {financialAnalysis.data_reliability.confidence_level} | 
                  データソース: {financialAnalysis.data_reliability.data_sources}件 | 
                  AI検索: {financialAnalysis.data_reliability.vertex_ai_search_used ? "有効" : "無効"}
                </Typography>
              </Box>
            )}
          </>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1, color: "#4caf50" }}>
              <CheckCircle color="success" fontSize="small" />
              メリット
            </Typography>
            <Box>
              {evaluation.advantages.map((advantage, index) => (
                <Typography key={index} variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.5 }}>
                  <Box component="span" sx={{ color: "success.main", fontWeight: "bold", mt: 0.2 }}>✓</Box>
                  <Box>{advantage}</Box>
                </Typography>
              ))}
              
              {/* 財政分析のポジティブ要因も追加 */}
              {financialAnalysis?.positive_factors?.map((factor, index) => (
                <Typography key={`fin-pos-${index}`} variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.5 }}>
                  <Box component="span" sx={{ color: "success.main", fontWeight: "bold", mt: 0.2 }}>💰</Box>
                  <Box>{factor}</Box>
                </Typography>
              ))}
            </Box>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1, color: "#ff9800" }}>
              <Warning color="warning" fontSize="small" />
              デメリット
            </Typography>
            <Box>
              {evaluation.disadvantages.map((disadvantage, index) => (
                <Typography key={index} variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.5 }}>
                  <Box component="span" sx={{ color: "warning.main", fontWeight: "bold", mt: 0.2 }}>⚠</Box>
                  <Box>{disadvantage}</Box>
                </Typography>
              ))}
              
              {/* 財政分析のネガティブ要因も追加 */}
              {financialAnalysis?.negative_factors?.map((factor, index) => (
                <Typography key={`fin-neg-${index}`} variant="body2" sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.5 }}>
                  <Box component="span" sx={{ color: "warning.main", fontWeight: "bold", mt: 0.2 }}>💸</Box>
                  <Box>{factor}</Box>
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, display: "flex" }}>
        {/* 左側：検索エリア */}
        <Box
          sx={{
            width: "35%",
            borderRight: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            bgcolor: "white"
          }}
        >
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
              rows={3}
              placeholder="https://suumo.jp/chintai/jnc_000098936980/"
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

          {/* 総合評価をここに表示 */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {apiResponse?.analysis ? (
              <EvaluationInfo 
                evaluation={apiResponse.analysis.evaluation}
                financialAnalysis={apiResponse.analysis.financial_analysis}
              />
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
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  {loading ? "解析中..." : "総合評価がここに表示されます"}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* 右側：解析結果表示エリア */}
        <Box
          sx={{
            width: "65%",
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
              物件詳細情報
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              基本情報・アクセス・設備の詳細
            </Typography>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {apiResponse?.analysis ? (
              <Box>
                <PropertyBasicInfo basicInfo={apiResponse.analysis.basic_info} />
                <LocationInfo location={apiResponse.analysis.location} />
                <FeatureInfo features={apiResponse.analysis.features} />
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
                  {loading ? "解析中..." : "物件URLを入力して解析を開始してください"}
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