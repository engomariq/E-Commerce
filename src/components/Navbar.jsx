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
import { useNavigate } from "react-router-dom";
import HandymanIcon from "@mui/icons-material/Handyman";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
        
          <Box>
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

       
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
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
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
                width: "300px",
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
