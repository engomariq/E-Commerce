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
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const { searchText, setSearchText } = useSearch();

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  };

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: "22px 22px 22px 22px",
        boxShadow: "0px 0px 11px rgba(0, 0, 0, 1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            {!isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontSize: "1.5rem",
                    mr: 2,
                    fontWeight: 700,
                  }}
                >
                  تسجيل دخول
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  حساب جديد
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register?type=worker")}
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                  }}
                >
                  حساب جديد
                </Button>
              </>
            )}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={55}
            flexDirection="row-reverse"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                حِرَف
              </Typography>
            </Box>

            <TextField
              placeholder="ابحث عن حرفي..."
              size="small"
              dir="rtl"
              value={searchText}
              onChange={handleSearchChange}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                marginLeft: "auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "& input": {
                    textAlign: "right",
                    direction: "rtl",
                    paddingRight: "14px",
                  },
                },
                width: "300px",
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
