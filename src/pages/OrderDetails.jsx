import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { Phone, Cancel, DoneAll } from "@mui/icons-material";

const ordersData = [
  {
    id: 1,
    service: "سباكة",
    artisan: "علي محمد",
    status: "قيد الانتظار",
    date: "2025-10-01",
    description: "تصليح تسريب الماء في المطبخ",
    price: "$40",
    address: "الموصل، شارع الزهراء",
  },
  {
    id: 2,
    service: "نجارة",
    artisan: "عمر صالح",
    status: "مقبول",
    date: "2025-09-28",
    description: "تركيب باب خشبي للغرفة",
    price: "$60",
    address: "الموصل، حي الصناعة",
  },
  {
    id: 3,
    service: "كهرباء",
    artisan: "مصطفى خالد",
    status: "مكتمل",
    date: "2025-09-25",
    description: "إصلاح دائرة كهربائية في الصالة",
    price: "$50",
    address: "الموصل، حي الزهور",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "قيد الانتظار":
      return "warning";
    case "مقبول":
      return "info";
    case "مكتمل":
      return "success";
    default:
      return "default";
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const order = ordersData.find((o) => o.id === parseInt(id));

  if (!order) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h5">الطلب غير موجود</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mt: 10,
        background: "linear-gradient(120deg, #29373e, #f0f8ff, #d9f0ff, #e6f4ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 25s ease infinite",
      }}
    >
      <Card
        sx={{
          position: "relative",
          borderRadius: 4,
          maxWidth: 650,
          width: "100%",
          p: 3,
          background: "linear-gradient(135deg, #6366f1, #3b82f6, #8b5cf6)",
          color: "#fff",
          boxShadow: "0px 12px 40px rgba(0,0,0,0.25)",
          transition: "transform 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          "&:hover": { transform: "translateY(-15px) scale(1.03)", boxShadow: "0px 25px 60px rgba(0,0,0,0.4)", filter: "brightness(1.2)" },
        }}
      >
       
        <Box
          sx={{
            width: "100%",
            height: 6,
            borderRadius: "3px",
            background: "linear-gradient(90deg, #6366f1, #3b82f6, #8b5cf6)",
            mb: 2,
          }}
        />

        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, textAlign: "center", color: "#fff" }}
          >
            تفاصيل الطلب
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
            الخدمة: {order.service}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            الحرفي: {order.artisan}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            التاريخ: {order.date}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            العنوان: {order.address}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            الوصف: {order.description}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#f3f4f6" }}>
            السعر: {order.price}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Chip
              label={order.status}
              color={getStatusColor(order.status)}
              sx={{
                fontWeight: 700,
                padding: "0 14px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                "&:hover": { transform: "scale(1.08)", background: "rgba(255,255,255,0.35)" },
              }}
            />

            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                borderRadius: 18,
                textTransform: "none",
                fontWeight: 700,
                transition: "all 0.3s ease",
                boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
                background: "linear-gradient(90deg, #6366f1, #3b82f6, #8b5cf6)",
                "&:hover": { transform: "scale(1.1)", boxShadow: "0px 8px 28px rgba(0,0,0,0.4)" },
              }}
            >
              التواصل مع الحرفي
            </Button>

            {order.status === "قيد الانتظار" && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                sx={{
                  borderRadius: 18,
                  textTransform: "none",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                }}
              >
                إلغاء الطلب
              </Button>
            )}

            {order.status === "مكتمل" && (
              <Button
                variant="outlined"
                color="success"
                startIcon={<DoneAll />}
                sx={{
                  borderRadius: 18,
                  textTransform: "none",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                }}
              >
                تم المراجعة
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;