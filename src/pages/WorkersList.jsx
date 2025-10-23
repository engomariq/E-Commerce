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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, LocationOn, Work } from "@mui/icons-material";

// بيانات الحرفيين الافتراضية
const workersData = [
  {
    id: 1,
    name: "أحمد محمد",
    profession: "كهربائي",
    city: "الزهور",
    rating: 4.8,
    reviews: 127,
    experience: 8,
    price: "50-100",
    image: "/workers/electrician1.jpg",
    description: "متخصص في التركيبات الكهربائية المنزلية والتجارية",
    completedJobs: 234,
    available: true,
  },
  {
    id: 2,
    name: "مصطفى خالد",
    profession: "كهربائي",
    city: "الرفاعي",
    rating: 4.9,
    reviews: 89,
    experience: 12,
    price: "60-120",
    image: "/workers/electrician2.jpg",
    description: "خبير في إصلاح الأعطال الكهربائية المعقدة",
    completedJobs: 189,
    available: true,
  },
  {
    id: 3,
    name: "علي حسين",
    profession: "سباك",
    city: "النور",
    rating: 4.7,
    reviews: 156,
    experience: 10,
    price: "40-80",
    image: "/workers/plumber1.jpg",
    description: "متخصص في أعمال السباكة المنزلية والتجارية",
    completedJobs: 312,
    available: true,
  },
  {
    id: 4,
    name: "عمر صالح",
    profession: "سباك",
    city: "الوحدة",
    rating: 4.6,
    reviews: 98,
    experience: 7,
    price: "35-70",
    image: "/workers/plumber2.jpg",
    description: "خبير في حل مشاكل التسريبات والتصريف",
    completedJobs: 167,
    available: false,
  },
  {
    id: 5,
    name: "خالد إبراهيم",
    profession: "نجار",
    city: "التحرير",
    rating: 4.9,
    reviews: 203,
    experience: 15,
    price: "80-150",
    image: "/workers/carpenter1.jpg",
    description: "فنان في الأعمال الخشبية والديكورات",
    completedJobs: 445,
    available: true,
  },
  {
    id: 6,
    name: "محمود عبدالله",
    profession: "صباغ",
    city: "الإصلاح الزراعي",
    rating: 4.5,
    reviews: 134,
    experience: 9,
    price: "30-60",
    image: "/workers/painter1.jpg",
    description: "متخصص في أعمال الدهان والتشطيبات الحديثة",
    completedJobs: 278,
    available: true,
  },
];

const cities = [
  "الزهور", "الرفاعي", "النور", "الوحدة", "التحرير", "الإصلاح الزراعي",
  "القادسية", "الحدباء", "الميثاق", "المأمون", "الرسالة", "فلسطين",
  "الشرطة", "المثنى", "الكرامة", "الصديق", "السكر", "الضباط", "العربي",
  "الصحة", "المصارف", "الزراعي", "البلديات", "الفيصلية", "اليرموك",
  "سومر", "الرشيدية", "الكفاءات", "الجزائر", "الغزلاني", "المهندسين",
  "المجموعة الثقافية", "النبي يونس", "الكندي الأولى", "الكندي الثانية",
  "الأندلس", "الشفاء", "الحرية", "العامل", "الصناعة", "الموصل الجديدة",
  "الدواسة", "باب الطوب", "باب السراي", "الدندان", "الميدان", "الساعة",
  "باب سنجار", "باب لكش", "الفاروق", "الزنجيلي", "المنصور", "17 تموز",
  "تل الرمان", "وادي حجر", "القاهرة", "البكر", "الجامعة"
];

const professions = [
  "كهربائي", "سباك", "نجار", "صباغ", "مكيفات", "السيراميك", 
  "جبس", "ألمنيوم", "حداد", "تنظيف", "عامل للحدائق", "عازل حراري"
];

function WorkersList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [workers, setWorkers] = useState(workersData);
  const [filters, setFilters] = useState({
    profession: "",
    city: "",
    search: "",
    minRating: 0,
  });

  // استخراج المهنة من الـ query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const professionFromUrl = params.get("profession");
    if (professionFromUrl) {
      setFilters(prev => ({ ...prev, profession: professionFromUrl }));
    }
  }, [location]);

  // تطبيق الفلترة
  useEffect(() => {
    let filtered = workersData;

    if (filters.profession) {
      filtered = filtered.filter(worker => 
        worker.profession === filters.profession
      );
    }

    if (filters.city) {
      filtered = filtered.filter(worker => 
        worker.city === filters.city
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(worker =>
        worker.name.toLowerCase().includes(searchLower) ||
        worker.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(worker => 
        worker.rating >= filters.minRating
      );
    }

    setWorkers(filtered);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      profession: "",
      city: "",
      search: "",
      minRating: 0,
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
        {/* العنوان والبحث */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
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

        {/* فلترات البحث */}
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
                  <MenuItem key={prof} value={prof}>{prof}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>المنطقة</InputLabel>
              <Select
                value={filters.city}
                label="المنطقة"
                onChange={(e) => handleFilterChange("city", e.target.value)}
              >
                <MenuItem value="">جميع المناطق</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
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

        {/* نتائج البحث */}
        <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
          {workers.length} حرفي متاح
        </Typography>

        {/* قائمة الحرفيين */}
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
                {/* صورة الحرفي */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={worker.image}
                    alt={worker.name}
                    sx={{
                      objectFit: "cover",
                      filter: worker.available ? "none" : "grayscale(50%)",
                    }}
                  />
                  <Chip
                    label={worker.available ? "متاح" : "غير متاح"}
                    color={worker.available ? "success" : "default"}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                    }}
                  />
                  <Chip
                    label={worker.profession}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: getProfessionColor(worker.profession),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* اسم الحرفي وتقييمه */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {worker.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating value={worker.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({worker.rating})
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        ({worker.reviews} تقييم)
                      </Typography>
                    </Box>
                  </Box>

                  {/* المعلومات */}
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn sx={{ fontSize: 18, color: "text.secondary", ml: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {worker.city}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Work sx={{ fontSize: 18, color: "text.secondary", ml: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {worker.experience} سنوات خبرة
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {worker.completedJobs} مهمة مكتملة
                    </Typography>
                  </Stack>

                  {/* الوصف */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {worker.description}
                  </Typography>

                  {/* السعر والزر */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {worker.price} $
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/worker/${worker.id}`)}
                      disabled={!worker.available}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 3,
                      }}
                    >
                      طلب الخدمة
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* حالة عدم وجود نتائج */}
        {workers.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              لم يتم العثور على حرفيين
            </Typography>
            <Typography variant="body1" color="text.secondary">
              حاول تغيير معايير البحث الخاصة بك
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default WorkersList;