import React, { useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "غير متوفر";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-IQ");
  };

  // تحديد لون الخلفية بناءً على نوع المستخدم
  const backgroundColor = user.role === "worker" ? "#1976d2" : "#2c5364";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="md" sx={{ pt: 12, pb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* رأس الصفحة مع الصورة الرمزية */}
          <Box sx={{ display: "flex", gap: 3, mb: 4, direction: "rtl" }}>
            <Avatar
              src={user.profile_image}
              sx={{
                width: 80,
                height: 80,
                bgcolor: backgroundColor,
                fontSize: "2.5rem",
              }}
            >
              {user.name ? user.name[0] : "م"}
            </Avatar>
            <Box sx={{ flex: 1, textAlign: "right" }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                {user.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  عضو منذ: {formatDate(user.created_at)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    bgcolor: user.role === "worker" ? "#1976d2" : "#2c5364",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {user.role === "worker" ? "حرفي" : user.role === "client" ? "عميل" : "مدير"}
                </Typography>
              </Box>
              {user.role === "worker" && user.workerProfile && (
                <Typography variant="body2" color="text.secondary">
                  المهنة: {user.workerProfile.profession_id}
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* معلومات المستخدم */}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main", mb: 3 }}
            >
              المعلومات الشخصية
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {user.email && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      direction: "rtl",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      البريد الإلكتروني:
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {user.email}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    direction: "rtl",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    رقم الهاتف:
                  </Typography>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    {user.phone}
                  </Typography>
                </Box>

                {user.neighborhood_id && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      direction: "rtl",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      الحي:
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {user.neighborhood_id}
                    </Typography>
                  </Box>
                )}

                {user.role === "worker" && user.workerProfile && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        direction: "rtl",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        سنوات الخبرة:
                      </Typography>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        {user.workerProfile.experience_years}
                      </Typography>
                    </Box>

                    {user.workerProfile.bio && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          direction: "rtl",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          نبذة عن العمل:
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {user.workerProfile.bio}
                        </Typography>
                      </Box>
                    )}

                    {user.workerProfile.contact_phone && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          direction: "rtl",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          رقم الاتصال:
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {user.workerProfile.contact_phone}
                        </Typography>
                      </Box>
                    )}

                    {user.workerProfile.whatsapp_number && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          direction: "rtl",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          واتساب:
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {user.workerProfile.whatsapp_number}
                        </Typography>
                      </Box>
                    )}

                    {user.workerProfile.rating && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          direction: "rtl",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          التقييم:
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {user.workerProfile.rating} ⭐ ({user.workerProfile.total_reviews} تقييم)
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        direction: "rtl",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        الحالة:
                      </Typography>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        {user.workerProfile.is_available ? "متاح" : "غير متاح"}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* أزرار الإجراءات */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/change-password")}
              sx={{
                minWidth: 120,
                borderRadius: "20px",
              }}
            >
              تغيير كلمة المرور
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{
                minWidth: 120,
                borderRadius: "20px",
              }}
            >
              تسجيل الخروج
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
