import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  Chip,
  Divider,
  Stack,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  LocationOn,
  Work,
  Star,
  Phone,
  Email,
  CalendarToday,
  CheckCircle,
  ThumbUp,
} from "@mui/icons-material";

// بيانات الحرفي الافتراضية
const workerProfileData = {
  1: {
    id: 1,
    name: "أحمد محمد",
    profession: "كهربائي",
    city: "الزهور",
    rating: 4.8,
    reviews: 127,
    experience: 8,
    priceRange: "50-100 $",
    image: "/workers/electrician1.jpg",
    description: "متخصص في التركيبات الكهربائية المنزلية والتجارية مع خبرة تزيد عن 8 سنوات. أقدم خدمات متميزة في مجال الكهرباء بجودة عالية وأسعار مناسبة.",
    completedJobs: 234,
    available: true,
    phone: "+9647701234567",
    email: "ahmed.mohammed@example.com",
    specialties: [
      "تركيب الأنظمة الكهربائية",
      "إصلاح الأعطال الكهربائية",
      "صيانة اللوحات الكهربائية",
      "تركيب الكاميرات والأنظمة الأمنية"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "محمد عبدالله",
        rating: 5,
        comment: "عمل ممتاز ومحترف جداً، أنصح الجميع بالتعامل معه",
        date: "2024-01-15"
      },
      {
        id: 2,
        customer: "سارة خالد",
        rating: 4.5,
        comment: "خدمة جيدة وسريعة، الأسعار معقولة",
        date: "2024-01-10"
      },
      {
        id: 3,
        customer: "علي حسين",
        rating: 4.8,
        comment: "حرفي متميز وأداء رائع، شكراً على المجهود",
        date: "2024-01-05"
      }
    ]
  },
  2: {
    id: 2,
    name: "مصطفى خالد",
    profession: "كهربائي",
    city: "الرفاعي",
    rating: 4.9,
    reviews: 89,
    experience: 12,
    priceRange: "60-120 $",
    image: "/workers/electrician2.jpg",
    description: "خبير في إصلاح الأعطال الكهربائية المعقدة والتركيبات الصناعية. أمتلك خبرة واسعة في حل المشكلات الكهربائية الصعبة.",
    completedJobs: 189,
    available: true,
    phone: "+9647701234568",
    email: "mustafa.khalid@example.com",
    specialties: [
      "الإصلاحات المعقدة",
      "التركيبات الصناعية",
      "أنظمة الطوارئ",
      "الطاقة الشمسية"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "فاطمة عمر",
        rating: 5,
        comment: "محترف وماهر، حل المشكلة بسرعة واحترافية",
        date: "2024-01-12"
      }
    ]
  }
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`worker-tabpanel-${index}`}
      aria-labelledby={`worker-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  const worker = workerProfileData[id];

  if (!worker) {
    return (
      <Box sx={{ textAlign: "center", py: 8, mt: 10 }}>
        <Typography variant="h4">الحرفي غير موجود</Typography>
        <Button variant="contained" onClick={() => navigate("/workers")} sx={{ mt: 2 }}>
          العودة لقائمة الحرفيين
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleServiceRequest = () => {
    if (selectedService) {
      // هنا يمكن إضافة منطق طلب الخدمة
      alert(`تم طلب خدمة ${selectedService} من ${worker.name}`);
    } else {
      alert("الرجاء اختيار نوع الخدمة المطلوبة");
    }
  };

  const getProfessionColor = (profession) => {
    const colors = {
      "كهربائي": "#ff6b35",
      "سباك": "#1a73e8",
      "نجار": "#8b4513",
      "صباغ": "#ffd700",
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
        {/* رأس الصفحة */}
        <Card sx={{ mb: 4, borderRadius: 3, overflow: "hidden" }}>
          <Box
            sx={{
              height: 200,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              position: "relative",
            }}
          />
          <CardContent sx={{ position: "relative", mt: -8, pt: 8 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={worker.image}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                      {worker.name}
                    </Typography>
                    <Chip
                      label={worker.profession}
                      sx={{
                        backgroundColor: getProfessionColor(worker.profession),
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    />
                    <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn sx={{ ml: 1, color: "text.secondary" }} />
                        <Typography variant="body1">{worker.city}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Work sx={{ ml: 1, color: "text.secondary" }} />
                        <Typography variant="body1">{worker.experience} سنوات خبرة</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Star sx={{ ml: 1, color: "warning.main" }} />
                        <Typography variant="body1">
                          {worker.rating} ({worker.reviews} تقييم)
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                  <Typography variant="h5" color="primary.main" gutterBottom>
                    {worker.priceRange}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    سعر الخدمة التقريبي
                  </Typography>
                  <Chip
                    label={worker.available ? "متاح للعمل" : "غير متاح حالياً"}
                    color={worker.available ? "success" : "default"}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => setTabValue(2)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    طلب الخدمة
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* التبويبات */}
        <Paper sx={{ width: "100%", mb: 4, borderRadius: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
              },
            }}
          >
            <Tab label="نبذة عن الحرفي" />
            <Tab label="التقييمات" />
            <Tab label="طلب الخدمة" />
          </Tabs>
        </Paper>

        {/* محتوى التبويبات */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                  عن الحرفي
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  {worker.description}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  التخصصات
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {worker.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      icon={<CheckCircle />}
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  الإحصائيات
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="المهام المكتملة"
                      secondary={worker.completedJobs}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ThumbUp color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="معدل الرضا"
                      secondary={`${Math.round((worker.rating / 5) * 100)}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="سنوات الخبرة"
                      secondary={worker.experience}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              تقييمات العملاء ({worker.reviews})
            </Typography>
            
            {worker.reviewsList.map((review) => (
              <Box key={review.id} sx={{ mb: 3, pb: 2, borderBottom: "1px solid #eee" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.customer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.date}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                  طلب خدمة من {worker.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  اختر نوع الخدمة المطلوبة وسيقوم الحرفي بالتواصل معك لتأكيد التفاصيل
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    نوع الخدمة المطلوبة
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {worker.specialties.map((specialty, index) => (
                      <Chip
                        key={index}
                        label={specialty}
                        clickable
                        color={selectedService === specialty ? "primary" : "default"}
                        onClick={() => setSelectedService(specialty)}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleServiceRequest}
                  disabled={!selectedService}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  تأكيد طلب الخدمة
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  معلومات التواصل
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="الهاتف" secondary={worker.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="البريد الإلكتروني" secondary={worker.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="الموقع" secondary={worker.city} />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
}

export default WorkerProfile;