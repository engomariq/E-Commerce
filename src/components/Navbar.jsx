import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HandymanIcon from "@mui/icons-material/Handyman";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // تحقق إذا كنا في صفحة الطلبات أو التفاصيل
  const isOrdersPage =
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/order");

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* القسم الأيسر */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* زر الطلبات */}
            <Button
              onClick={() => navigate("/orders")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: isOrdersPage ? "#00e5ff" : "inherit",
                backgroundColor: isOrdersPage
                  ? "rgba(0, 229, 255, 0.15)"
                  : "transparent",
                boxShadow: isOrdersPage ? "0 0 15px #00e5ff" : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#fff",
                  boxShadow: "0 0 15px #00e5ff",
                  backgroundColor: "rgba(0, 229, 255, 0.25)",
                },
              }}
            >
              الطلبات
            </Button>

            {!isAuthenticated ? (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  تسجيل دخول
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  حساب جديد
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/profile")}>
                حسابي
              </Button>
            )}
          </Box>

          {/* القسم الأيمن */}
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate("/")}
              >
                حِرَف
              </Typography>
              <HandymanIcon />
            </Box>

            <TextField
              placeholder="ابحث عن حرفي..."
              size="small"
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#00e5ff" },
                },
                width: "300px",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  boxShadow: "0 0 10px #00e5ff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;