import React, { useState } from "react";
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

const Orders = () => {
  const [orders] = useState([
    {
      id: 1,
      service: "Plumbing",
      artisan: "Ali Ahmed",
      status: "Pending",
      date: "2025-10-01",
      icon: <Plumbing />,
    },
    {
      id: 2,
      service: "Carpentry",
      artisan: "Omar Saleh",
      status: "Accepted",
      date: "2025-09-28",
      icon: <Build />,
    },
    {
      id: 3,
      service: "Electrician",
      artisan: "Sara Khalid",
      status: "Completed",
      date: "2025-09-25",
      icon: <ElectricBolt />,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Accepted":
        return "info";
      case "Completed":
        return "success";
      default:
        return "default";
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2, color: "#1e293b" }}
      >
        My Orders
      </Typography>

      {/* فلترة باستخدام Tabs (مودرن) */}
      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab value="All" label="All" />
        <Tab value="Pending" label="Pending" />
        <Tab value="Accepted" label="Accepted" />
        <Tab value="Completed" label="Completed" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0px 4px 14px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "#1976d2",
                      width: 60,
                      height: 60,
                      boxShadow: "0px 4px 12px rgba(25,118,210,0.4)",
                    }}
                  >
                    {order.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                      {order.service}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Artisan: {order.artisan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {order.date}
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
                  >
                    View Details
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