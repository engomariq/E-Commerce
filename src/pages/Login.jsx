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
// import { useTranslation } from "react-i18next"; //
// import { i18n } from "./i18n"; // للترجمة وتغيير اللغة
// import { useSnackbar } from "notistack"; // لعرض إشعارات ورسائل قصيرة للمستخدم

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("ar");
  const navigate = useNavigate();
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
    if (!email || !password) {
      alert("الرجاء إدخال البريد الإلكتروني وكلمة السر");
      return;
    }
   
    localStorage.setItem("isAuthenticated", "true");
    navigate("/pages");
    navigate("/pages");
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

        <TextField
          label="البريد الإلكتروني"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="كلمة السر"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
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
