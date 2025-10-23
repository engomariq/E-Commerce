import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { changePassword, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("الرجاء إدخال جميع الحقول");
      return;
    }

    if (newPassword.length < 6) {
      setError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين");
      return;
    }

    if (currentPassword === newPassword) {
      setError("كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية");
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });

      if (result.success) {
        setSuccess("تم تغيير كلمة المرور بنجاح!");
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Redirect to profile after 2 seconds
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError(result.error || "فشل تغيير كلمة المرور");
      }
    } catch (err) {
      setError("حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", pt: 12, pb: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, direction: "rtl" }}>
            <LockIcon sx={{ fontSize: 40, color: "primary.main", ml: 2 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              تغيير كلمة المرور
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="كلمة المرور الحالية"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="كلمة المرور الجديدة"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
              helperText="يجب أن تكون 6 أحرف على الأقل"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="تأكيد كلمة المرور الجديدة"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile")}
                disabled={isLoading}
                sx={{ minWidth: 100 }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ minWidth: 100 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "تغيير كلمة المرور"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ChangePassword;
