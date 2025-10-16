import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("ar");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleMenuClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    const result = login(email, password);
    
    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f2f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        p={4}
        bgcolor="#fff"
        borderRadius={2}
        boxShadow={24}
        width={350}
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          تسجيل الدخول
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" variant="body2">
            {error}
          </Typography>
        )}

        <TextField
          label="البريد الإلكتروني"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          dir="rtl"
        />

        <TextField
          label="كلمة المرور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          dir="rtl"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "12px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
        <Button
          variant="text"
          onClick={handleMenuClick}
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <KeyboardArrowDownIcon />
          اللغة
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLanguageChange("ar")}>
            العربية
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("en")}>
            English
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
export default Login;
