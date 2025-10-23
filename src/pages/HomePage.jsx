import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

function HomePage() {
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const services = [
    {
      title: "كهربائي",
      description: "خدمات كهربائية احترافية لمنزلك",
      image: "/services/electrician.jpg",
    },
    {
      title: "سباك",
      description: "حلول سباكة متكاملة وصيانة عامة",
      image: "/services/plumber.webp",
    },
    {
      title: "نجار",
      description: "أعمال نجارة وصيانة خشبية احترافية",
      image: "/services/joiner.jpg",
    },
    {
      title: "صباغ",
      description: "خدمات دهان وتشطيب عالية الجودة",
      image: "/services/dyestuff.jpg",
    },
    {
      title: "مكيفات",
      description: "تركيب وصيانة أنظمة التكييف",
      image: "/services/Air conditioning technician.jpg",
    },
    {
      title: "السيراميك",
      description: "تركيب وصيانة البلاط والسيراميك",
      image: " /services/tile technician.jpg",
    },
    {
      title: "السقوف والجدران",
      description: "تصميم وتنفيذ أعمال ونقش السقوف والجدران",
      image: "/services/Gypsum.webp",
    },
    {
      title: "ألمنيوم",
      description: "تركيب وصيانة الألمنيوم والزجاج",
      image: "/services/Aluminum Installer.jpg",
    },
    {
      title: "حداد",
      description: "أعمال الحدادة والمعادن",
      image: "/services/Blacksmith.jpg",
    },
    {
      title: "تنظيف",
      description: "خدمات تنظيف شاملة للمنازل",
      image: "/services/Housekeeper.jpg",
    },
    {
      title: "حدائق",
      description: "تنسيق وصيانة الحدائق",
      image: "/services/Gardener.png",
    },
    {
      title: "عزل",
      description: "خدمات العزل المائي والحراري",
      image: " /services/Waterproofing Technician.jpeg",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100%",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
      }}
    >
      <Container maxWidth="lg" sx={{ my: 12 }}>
        {!searchText && (
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
                width: "300px",
                height: "2px",
                backgroundColor: "primary.main",
                margin: "10px auto",
                borderRadius: "3px",
              },
            }}
          >
            أطلع على الخدمات
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 350px)",
              md: "repeat(3, 350px)",
            },
            columnGap: "100px",
            rowGap: "40px",
            width: "100%",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "1400px",
            padding: "0 40px",
          }}
        >
          {services
            .filter(
              (service) =>
                searchText === "" ||
                service.title.includes(searchText) ||
                service.description.includes(searchText)
            )
            .map((service, index) => (
              <Grid item key={index}>
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
                      "& .service-image": { transform: "scale(1.1)" },
                    },
                    minHeight: "500px",
                  }}
                >
                  <Box
                    className="service-image"
                    sx={{
                      height: "250px",
                      overflow: "hidden",
                      transition: "transform 0.5s ease",
                    }}
                  >
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.title}
                      sx={{
                        width: service.title === "ألمنيوم" ? "80%" : "100%",
                        height: service.title === "ألمنيوم" ? "180%" : "100%",
                        objectFit: "cover",
                        margin: service.title === "ألمنيوم" ? "10%" : "0",
                        display:
                          service.title === "ألمنيوم" ? "block" : "initial",
                        transform:
                          service.title === "ألمنيوم"
                            ? "translateY(-9%)"
                            : "none",
                      }}
                    />
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
                      variant="h4"
                      component="h2"
                      gutterBottom
                      align="center"
                      sx={{ fontWeight: 900, color: "primary.dark" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={900}
                      lineHeight={1.75}
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {service.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        navigate(`/workers?profession=${service.title}`)
                      }
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        width: "100%",
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
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
