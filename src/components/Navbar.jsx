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
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const { searchText, setSearchText } = useSearch();

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  };

  const isOrdersPage =
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/order");

  const buttonStyle = {
    textTransform: "none",
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "inherit",
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
    padding: "6px 16px",
    minWidth: "120px",
    "&:hover": {
      color: "#fff",
      boxShadow: "0 0 15px #00e5ff",
      backgroundColor: "rgba(0, 229, 255, 0.25)",
    },
  };

  const activeButtonStyle = {
    ...buttonStyle,
    color: "#00e5ff",
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    boxShadow: "0 0 15px #00e5ff",
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {!isAuthenticated && (
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={buttonStyle}
              >
                تسجيل دخول
              </Button>
            )}
          </Box>

       
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              placeholder="ابحث عن حرفي..."
              size="small"
              dir="rtl"
              value={searchText}
              onChange={handleSearchChange}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#00e5ff" },
                  "& input": {
                    textAlign: "right",
                    direction: "rtl",
                    paddingRight: "14px",
                  },
                },
                width: "300px",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  boxShadow: "0 0 10px #00e5ff",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

        
          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {isAuthenticated ? (
              <Button
                onClick={() => navigate("/register?type=worker")}
                sx={buttonStyle}
              >
                حساب جديد
              </Button>
            ) : (
              <Button onClick={() => navigate("/register")} sx={buttonStyle}>
                حساب جديد
              </Button>
            )}

            {isAuthenticated && (
              <Button
                onClick={() => navigate("/orders")}
                sx={isOrdersPage ? activeButtonStyle : buttonStyle}
              >
                الطلبات
              </Button>
            )}

            <Button onClick={() => navigate("/")} sx={buttonStyle}>
              حرف
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
