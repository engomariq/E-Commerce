import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  Button,
  Avatar,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { Build, Plumbing, ElectricBolt } from "@mui/icons-material";
import "./Orders.css"; 

const Orders = () => {
  const [filter, setFilter] = useState("الكل");
  const navigate = useNavigate();

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

  const getIcon = (service) => {
    switch (service) {
      case "سباكة":
        return <Plumbing />;
      case "نجارة":
        return <Build />;
      case "كهرباء":
        return <ElectricBolt />;
      default:
        return <Build />;
    }
  };

  const filteredOrders =
    filter === "الكل"
      ? ordersData
      : ordersData.filter((order) => order.status === filter);

  return (
    <Box className="gradientBG" sx={{ minHeight: "100vh", p: 3, mt: 10 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "#3c5889ff" }}
      >
        طلباتي
      </Typography>

      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        textColor="inherit"
        indicatorColor="secondary"
        sx={{ mb: 3 }}
      >
        <Tab value="الكل" label="الكل" />
        <Tab value="قيد الانتظار" label="قيد الانتظار" />
        <Tab value="مقبول" label="مقبول" />
        <Tab value="مكتمل" label="مكتمل" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredOrders.map((order, index) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 30px rgba(0,0,0,0.3)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "#6366f1",
                      width: 60,
                      height: 60,
                      boxShadow: "0px 4px 12px rgba(99,102,241,0.4)",
                    }}
                  >
                    {getIcon(order.service)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                      {order.service}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      الحرفي: {order.artisan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      التاريخ: {order.date}
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 2 }}
                >
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{ fontWeight: "bold" }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      background: "linear-gradient(90deg, #6366f1, #3b82f6)",
                      boxShadow: "0px 4px 12px rgba(99,102,241,0.4)",
                    }}
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    عرض التفاصيل
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orders;