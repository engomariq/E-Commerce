import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, LocationOn, Work } from "@mui/icons-material";
import { workerService } from "../services";
import { professionService } from "../services";
import { neighborhoodService } from "../services";

function WorkersList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [workers, setWorkers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    profession: "",
    neighborhood: "",
    search: "",
    minRating: 0,
    available: false,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const professionFromUrl = params.get("profession");
    if (professionFromUrl) {
      setFilters(prev => ({ ...prev, profession: professionFromUrl }));
    }
  }, [location]);

  useEffect(() => {
    loadWorkers();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const [professionsData, neighborhoodsData] = await Promise.all([
        professionService.getProfessionsWithCache(),
        neighborhoodService.getNeighborhoodsWithCache(),
      ]);
      setProfessions(professionsData);
      setNeighborhoods(neighborhoodsData);
    } catch (err) {
      console.error("Error loading initial data:", err);
    }
  };

  const loadWorkers = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      
      if (filters.profession) {
        const selectedProfession = professions.find(p => p.name === filters.profession);
        if (selectedProfession) {
          params.profession_id = selectedProfession.id;
        }
      }

      if (filters.neighborhood) {
        const selectedNeighborhood = neighborhoods.find(n => n.name === filters.neighborhood);
        if (selectedNeighborhood) {
          params.neighborhood_id = selectedNeighborhood.id;
        }
      }

      if (filters.search) {
        params.search = filters.search;
      }

      if (filters.minRating > 0) {
        params.min_rating = filters.minRating;
      }

      if (filters.available) {
        params.is_available = true;
      }

      params.sort = "rating";
      params.order = "DESC";

      const response = await workerService.searchWorkers(params);
      setWorkers(response.data || []);
    } catch (err) {
      console.error("Error loading workers:", err);
      setError("فشل تحميل قائمة العمال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      profession: "",
      neighborhood: "",
      search: "",
      minRating: 0,
      available: false,
    });
  };

  const getProfessionColor = (profession) => {
    const colors = {
      "كهربائي": "#ff6b35",
      "سباك": "#1a73e8",
      "نجار": "#8b4513",
      "صباغ": "#ffd700",
      "مكيفات": "#00bcd4",
      "السيراميك": "#795548",
      "جبس": "#e0e0e0",
      "ألمنيوم": "#607d8b",
      "حداد": "#455a64",
      "تنظيف": "#4caf50",
      "عامل للحدائق": "#388e3c",
      "عازل حراري": "#ff9800"
    };
    return colors[profession] || "#666";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        pt: 10,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: 700,
              color: "primary.main",
              background: "linear-gradient(45deg, #0f3057, #3c5889)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {filters.profession ? `حرفيي ${filters.profession}` : "جميع الحرفيين"}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            اكتشف أفضل الحرفيين المهرة في منطقتك
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="ابحث عن حرفي..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: "text.secondary", ml: 1 }} />,
              }}
              sx={{ minWidth: 200 }}
            />
            
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>المهنة</InputLabel>
              <Select
                value={filters.profession}
                label="المهنة"
                onChange={(e) => handleFilterChange("profession", e.target.value)}
              >
                <MenuItem value="">جميع المهن</MenuItem>
                {professions.map((prof) => (
                  <MenuItem key={prof.id} value={prof.name}>{prof.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>الحي</InputLabel>
              <Select
                value={filters.neighborhood}
                label="الحي"
                onChange={(e) => handleFilterChange("neighborhood", e.target.value)}
              >
                <MenuItem value="">جميع الأحياء</MenuItem>
                {neighborhoods.map((neighborhood) => (
                  <MenuItem key={neighborhood.id} value={neighborhood.name}>
                    {neighborhood.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>التقييم الأدنى</InputLabel>
              <Select
                value={filters.minRating}
                label="التقييم الأدنى"
                onChange={(e) => handleFilterChange("minRating", e.target.value)}
              >
                <MenuItem value={0}>جميع التقييمات</MenuItem>
                <MenuItem value={4.5}>4.5 ⭐ فما فوق</MenuItem>
                <MenuItem value={4.0}>4.0 ⭐ فما فوق</MenuItem>
                <MenuItem value={3.5}>3.5 ⭐ فما فوق</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{ minWidth: 120 }}
            >
              مسح الكل
            </Button>
          </Stack>
        </Card>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
              {workers.length} حرفي متاح
            </Typography>

            <Grid container spacing={3}>
              {workers.map((worker) => (
                <Grid item xs={12} sm={6} md={4} key={worker.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={workerService.getProfileImageUrl(worker.profile_image) || "/workers/default.jpg"}
                        alt={worker.user?.name}
                        sx={{
                          objectFit: "cover",
                          filter: worker.is_available ? "none" : "grayscale(50%)",
                        }}
                      />
                      <Chip
                        label={worker.is_available ? "متاح" : "غير متاح"}
                        color={worker.is_available ? "success" : "default"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                        }}
                      />
                      <Chip
                        label={worker.profession?.name || "غير محدد"}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: getProfessionColor(worker.profession?.name),
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {worker.user?.name || "غير محدد"}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Rating value={worker.average_rating || 0} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({worker.average_rating?.toFixed(1) || "0.0"})
                          </Typography>
                        </Box>
                      </Box>

                      <Stack spacing={1} sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOn sx={{ fontSize: 18, color: "text.secondary", ml: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {worker.user?.neighborhood?.name || "غير محدد"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Work sx={{ fontSize: 18, color: "text.secondary", ml: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {worker.experience_years || 0} سنوات خبرة
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {worker.total_jobs || 0} مهمة مكتملة
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.6 }}
                      >
                        {worker.bio || "لا يوجد وصف"}
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          {worker.contact_phone || "لا يوجد رقم"}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/workers/${worker.id}`)}
                          disabled={!worker.is_available}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 3,
                          }}
                        >
                          عرض الملف
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {workers.length === 0 && !loading && (
              <Box sx={{ textAlign: "center", py: 8, width: "100%" }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  لا يوجد عمال مطابقين للبحث
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  حاول تغيير معايير البحث الخاصة بك
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default WorkersList;