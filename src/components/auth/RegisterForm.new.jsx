import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useLocation, useNavigate } from "react-router-dom";

const professions = [
  "كهربائي",
  "سباك",
  "نجار",
  "دهان",
  "مكيفات",
  "السيراميك",
  "جبس",
  "ألمنيوم",
  "حداد",
  "تنظيف",
  "حدائق",
  "عزل",
];

const cities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "تبوك",
  "أبها",
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("client");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "worker") {
      setUserType("worker");
    }
  }, [location]);

  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [workerForm, setWorkerForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
    experience: "",
    city: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleUserTypeChange = (event, newType) => {
    if (newType !== null) {
      setUserType(newType);
      if (newType === "worker") {
        navigate("/register?type=worker", { replace: true });
      } else {
        navigate("/register", { replace: true });
      }
    }
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.name) newErrors.name = "الاسم مطلوب";
    if (!data.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }
    if (!data.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (data.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (userType === "worker") {
      if (!data.phone) newErrors.phone = "رقم الهاتف مطلوب";
      if (!data.profession) newErrors.profession = "نوع الحرفة مطلوب";
      if (!data.city) newErrors.city = "المدينة مطلوبة";
      if (!data.experience) newErrors.experience = "سنوات الخبرة مطلوبة";
      if (!data.price) newErrors.price = "سعر الخدمة مطلوب";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = userType === "client" ? clientForm : workerForm;
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Form submitted:", formData);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "حدث خطأ أثناء إرسال النموذج" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleWorkerChange = (event) => {
    const { name, value } = event.target;
    setWorkerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "&:hover fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
  };

  const selectStyles = {
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "& .MuiSelect-select": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "16px",
          background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 4,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              backgroundColor: "primary.main",
              borderRadius: "2px",
            },
          }}
        >
          إنشاء حساب
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            "& .MuiToggleButton-root": {
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: "12px !important",
              px: 4,
              py: 1.5,
              mx: 1,
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            },
          }}
        >
          <ToggleButtonGroup
            value={userType}
            exclusive
            onChange={handleUserTypeChange}
            aria-label="نوع المستخدم"
            dir="rtl"
          >
            <ToggleButton value="client" aria-label="عميل">
              <PersonIcon sx={{ ml: 1 }} />
              عميل
            </ToggleButton>
            <ToggleButton value="worker" aria-label="حرفي">
              <HandymanIcon sx={{ ml: 1 }} />
              حرفي
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Chip
            icon={userType === "client" ? <PersonIcon /> : <HandymanIcon />}
            label={userType === "client" ? "حساب عميل" : "حساب حرفي"}
            color="primary"
            sx={{
              py: 2.5,
              px: 2,
              borderRadius: "12px",
              "& .MuiChip-icon": {
                fontSize: "1.5rem",
              },
              "& .MuiChip-label": {
                fontSize: "1rem",
                fontWeight: 600,
              },
            }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="الاسم"
                name="name"
                value={
                  userType === "client" ? clientForm.name : workerForm.name
                }
                onChange={
                  userType === "client"
                    ? handleClientChange
                    : handleWorkerChange
                }
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                name="email"
                type="email"
                value={
                  userType === "client" ? clientForm.email : workerForm.email
                }
                onChange={
                  userType === "client"
                    ? handleClientChange
                    : handleWorkerChange
                }
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="كلمة المرور"
                name="password"
                type="password"
                value={
                  userType === "client"
                    ? clientForm.password
                    : workerForm.password
                }
                onChange={
                  userType === "client"
                    ? handleClientChange
                    : handleWorkerChange
                }
                error={Boolean(errors.password)}
                helperText={errors.password}
                required
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                name="phone"
                value={
                  userType === "client" ? clientForm.phone : workerForm.phone
                }
                onChange={
                  userType === "client"
                    ? handleClientChange
                    : handleWorkerChange
                }
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                required={userType === "worker"}
                sx={textFieldStyles}
              />
            </Grid>

            {userType === "worker" && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.profession)}>
                    <InputLabel>نوع الحرفة</InputLabel>
                    <Select
                      name="profession"
                      value={workerForm.profession}
                      onChange={handleWorkerChange}
                      required
                      sx={selectStyles}
                    >
                      {professions.map((profession) => (
                        <MenuItem key={profession} value={profession}>
                          {profession}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.profession && (
                      <FormHelperText>{errors.profession}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="سنوات الخبرة"
                    name="experience"
                    type="number"
                    value={workerForm.experience}
                    onChange={handleWorkerChange}
                    error={Boolean(errors.experience)}
                    helperText={errors.experience}
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.city)}>
                    <InputLabel>المدينة</InputLabel>
                    <Select
                      name="city"
                      value={workerForm.city}
                      onChange={handleWorkerChange}
                      required
                      sx={selectStyles}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && (
                      <FormHelperText>{errors.city}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="سعر الخدمة التقريبي"
                    name="price"
                    value={workerForm.price}
                    onChange={handleWorkerChange}
                    error={Boolean(errors.price)}
                    helperText={errors.price}
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="نبذة عن الخدمة"
                    name="description"
                    multiline
                    rows={4}
                    value={workerForm.description}
                    onChange={handleWorkerChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    sx={textFieldStyles}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  backgroundColor: "primary.main",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                إنشاء حساب
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
