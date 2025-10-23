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
import { useAuth } from "../context/AuthContext";
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
  },
  3: {
    id: 3,
    name: "حسن علي",
    profession: "سباك",
    city: "الزهور",
    rating: 4.7,
    reviews: 95,
    experience: 10,
    priceRange: "40-90 $",
    image: "/workers/plumber1.jpg",
    description: "خبير في أعمال السباكة المنزلية والتجارية. متخصص في إصلاح التسريبات وتركيب الأنظمة الصحية.",
    completedJobs: 210,
    available: true,
    phone: "+9647701234569",
    email: "hassan.ali@example.com",
    specialties: [
      "إصلاح التسريبات",
      "تركيب الأنظمة الصحية",
      "صيانة المضخات",
      "تمديد الأنابيب"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "خالد أحمد",
        rating: 5,
        comment: "عمل ممتاز وسريع",
        date: "2024-01-14"
      }
    ]
  },
  4: {
    id: 4,
    name: "يوسف محمود",
    profession: "نجار",
    city: "الرفاعي",
    rating: 4.6,
    reviews: 78,
    experience: 7,
    priceRange: "45-95 $",
    image: "/workers/carpenter1.jpg",
    description: "نجار ماهر متخصص في صناعة الأثاث المنزلي والمكتبي. أقدم تصاميم عصرية وجودة عالية.",
    completedJobs: 156,
    available: true,
    phone: "+9647701234570",
    email: "yousef.mahmoud@example.com",
    specialties: [
      "صناعة الأثاث",
      "تركيب الأبواب والنوافذ",
      "الديكورات الخشبية",
      "إصلاح الأثاث"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "نور الدين",
        rating: 4.5,
        comment: "حرفي ماهر وأسعار معقولة",
        date: "2024-01-13"
      }
    ]
  },
  5: {
    id: 5,
    name: "عمر سعيد",
    profession: "صباغ",
    city: "الزهور",
    rating: 4.8,
    reviews: 102,
    experience: 9,
    priceRange: "35-80 $",
    image: "/workers/painter1.jpg",
    description: "صباغ محترف متخصص في الدهانات الداخلية والخارجية. أستخدم أفضل أنواع الدهانات.",
    completedJobs: 198,
    available: true,
    phone: "+9647701234571",
    email: "omar.saeed@example.com",
    specialties: [
      "الدهانات الداخلية",
      "الدهانات الخارجية",
      "الديكورات الجدارية",
      "دهانات الأبواب والنوافذ"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "ليلى حسن",
        rating: 5,
        comment: "عمل نظيف ومتقن",
        date: "2024-01-11"
      }
    ]
  },
  6: {
    id: 6,
    name: "كريم عبدالله",
    profession: "كهربائي",
    city: "الرفاعي",
    rating: 4.5,
    reviews: 67,
    experience: 6,
    priceRange: "45-85 $",
    image: "/workers/electrician3.jpg",
    description: "كهربائي متخصص في التركيبات المنزلية والصيانة الدورية.",
    completedJobs: 142,
    available: true,
    phone: "+9647701234572",
    email: "karim.abdullah@example.com",
    specialties: [
      "التركيبات المنزلية",
      "الصيانة الدورية",
      "إصلاح الأعطال",
      "تركيب الإنارة"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "رامي خالد",
        rating: 4.5,
        comment: "خدمة جيدة",
        date: "2024-01-09"
      }
    ]
  },
  7: {
    id: 7,
    name: "طارق فيصل",
    profession: "سباك",
    city: "الزهور",
    rating: 4.9,
    reviews: 115,
    experience: 11,
    priceRange: "50-100 $",
    image: "/workers/plumber2.jpg",
    description: "سباك خبير في جميع أعمال السباكة والصرف الصحي.",
    completedJobs: 225,
    available: true,
    phone: "+9647701234573",
    email: "tariq.faisal@example.com",
    specialties: [
      "السباكة المنزلية",
      "الصرف الصحي",
      "تركيب الفلاتر",
      "صيانة السخانات"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "منى أحمد",
        rating: 5,
        comment: "ممتاز جداً",
        date: "2024-01-08"
      }
    ]
  },
  8: {
    id: 8,
    name: "وليد حسين",
    profession: "نجار",
    city: "الرفاعي",
    rating: 4.7,
    reviews: 88,
    experience: 8,
    priceRange: "40-90 $",
    image: "/workers/carpenter2.jpg",
    description: "نجار محترف في صناعة وتصليح الأثاث المنزلي.",
    completedJobs: 175,
    available: true,
    phone: "+9647701234574",
    email: "walid.hussein@example.com",
    specialties: [
      "صناعة الأثاث المنزلي",
      "تصليح الأثاث",
      "تركيب المطابخ",
      "الأعمال الخشبية"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "سامي علي",
        rating: 4.8,
        comment: "حرفي ماهر",
        date: "2024-01-07"
      }
    ]
  },
  9: {
    id: 9,
    name: "ماجد سالم",
    profession: "صباغ",
    city: "الزهور",
    rating: 4.6,
    reviews: 72,
    experience: 7,
    priceRange: "38-82 $",
    image: "/workers/painter2.jpg",
    description: "صباغ متخصص في جميع أنواع الدهانات الحديثة.",
    completedJobs: 160,
    available: true,
    phone: "+9647701234575",
    email: "majed.salem@example.com",
    specialties: [
      "الدهانات الحديثة",
      "الديكور",
      "دهانات الواجهات",
      "الدهانات الخاصة"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "هدى محمد",
        rating: 4.7,
        comment: "عمل جيد",
        date: "2024-01-06"
      }
    ]
  },
  10: {
    id: 10,
    name: "فهد عمر",
    profession: "كهربائي",
    city: "الرفاعي",
    rating: 4.8,
    reviews: 98,
    experience: 9,
    priceRange: "48-95 $",
    image: "/workers/electrician4.jpg",
    description: "كهربائي خبير في جميع أعمال الكهرباء المنزلية والتجارية.",
    completedJobs: 205,
    available: true,
    phone: "+9647701234576",
    email: "fahad.omar@example.com",
    specialties: [
      "الكهرباء المنزلية",
      "الكهرباء التجارية",
      "أنظمة الإنذار",
      "الصيانة الشاملة"
    ],
    reviewsList: [
      {
        id: 1,
        customer: "ريم خالد",
        rating: 5,
        comment: "محترف وسريع",
        date: "2024-01-05"
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
  const { isAuthenticated } = useAuth();
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
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/register?redirect=service");
      return;
    }

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
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate("/register?redirect=service");
                      } else {
                        setTabValue(2);
                      }
                    }}
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