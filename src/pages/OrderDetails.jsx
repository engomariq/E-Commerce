import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { Phone, Cancel, DoneAll, Person, Home } from "@mui/icons-material";

const OrderDetails = ({ order }) => {
  const sampleOrder = order || {
    id: 1,
    service: "Plumbing",
    artisan: "Ali Ahmed",
    status: "Pending",
    date: "2025-10-01",
    description: "Fix water leakage in the kitchen sink.",
    price: "$40",
    address: "Mosul, Al-Zahraa Street",
  };

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

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          maxWidth: 600,
          width: "100%",
          p: 2,
          background: "#fff",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-4px)" },
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 2,
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Order Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" fontWeight="600">
            {sampleOrder.service}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Person color="primary" />
            <Typography variant="body1" color="text.secondary">
              Artisan: {sampleOrder.artisan}
            </Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Date: {sampleOrder.date}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Home color="action" />
            <Typography variant="body1" color="text.secondary">
              {sampleOrder.address}
            </Typography>
          </Stack>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Description: {sampleOrder.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: "success.main",
              fontWeight: "bold",
            }}
          >
            Price: {sampleOrder.price}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, flexWrap: "wrap" }}
            alignItems="center"
          >
            <Chip
              label={sampleOrder.status}
              color={getStatusColor(sampleOrder.status)}
              sx={{ fontWeight: "bold", px: 1.5 }}
            />

            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0px 4px 12px rgba(25,118,210,0.4)",
              }}
            >
              Contact Artisan
            </Button>

            {sampleOrder.status === "Pending" && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Cancel Order
              </Button>
            )}
            {sampleOrder.status === "Completed" && (
              <Button
                variant="outlined"
                color="success"
                startIcon={<DoneAll />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Mark as Reviewed
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;