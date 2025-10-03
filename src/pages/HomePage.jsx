import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import BuildIcon from "@mui/icons-material/Build";
import SearchIcon from "@mui/icons-material/Search";

function HomePage() {
  const services = [
    {
      title: "كهربائي",
      icon: <ElectricalServicesIcon sx={{ fontSize: 60 }} />,
      description: "خدمات كهربائية احترافية لمنزلك",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "سباك",
      icon: <PlumbingIcon sx={{ fontSize: 60 }} />,
      description: "حلول سباكة متكاملة وصيانة عامة",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "نجار",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "أعمال نجارة وصيانة خشبية احترافية",
      image:
        "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "دهان",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "خدمات دهان وتشطيب عالية الجودة",
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "مكيفات",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "تركيب وصيانة أنظمة التكييف",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "بلاط",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "تركيب وصيانة البلاط والسيراميك",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "جبس",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "تصميم وتنفيذ أعمال الجبس",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "ألمنيوم",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "تركيب وصيانة الألمنيوم والزجاج",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "حداد",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "أعمال الحدادة والمعادن",
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "تنظيف",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "خدمات تنظيف شاملة للمنازل",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "حدائق",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "تنسيق وصيانة الحدائق",
      image:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      title: "عزل",
      icon: <BuildIcon sx={{ fontSize: 60 }} />,
      description: "خدمات العزل المائي والحراري",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          pt: 15,
          pb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              backgroundImage:
                "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              color: "transparent",
              mb: 4,
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              animation: "fadeIn 1s ease-in",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(-20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            ابحث عن حرفيين محترفين
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{
              color: "white",
              mb: 6,
              opacity: 0.9,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.8,
              animation: "slideUp 1s ease-in",
              "@keyframes slideUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            نوفر لك أفضل الحرفيين في منطقتك بضغطة زر
          </Typography>
          <Box display="flex" justifyContent="center" mt={4}></Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 12 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "60px",
              height: "4px",
              backgroundColor: "primary.main",
              margin: "16px auto",
              borderRadius: "2px",
            },
            animation: "fadeIn 1s ease-in",
          }}
        >
          خدماتنا
        </Typography>
        <Grid
          container
          spacing={4}
          mt={2}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            "& .MuiGrid-item": {
              display: "flex",
              width: "100%",
              maxWidth: "100%",
              flexBasis: "100%",
            },
          }}
        >
          {services.map((service, index) => (
            <Grid
              item
              key={index}
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                    "& .service-image": {
                      transform: "scale(1.1)",
                    },
                  },
                  minHeight: "500px",
                  maxHeight: "500px",
                }}
              >
                <Box
                  className="service-image"
                  sx={{
                    height: "250px",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.5s ease",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    className="icon"
                    sx={{
                      position: "absolute",
                      bottom: -25,
                      right: 20,
                      backgroundColor: "primary.main",
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {service.icon}
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: "primary.dark",
                      mb: 1,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    عرض الحرفيين
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
