import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  People,
  Work,
  Assignment,
  Star,
  Delete,
  Edit,
  Block,
  CheckCircle,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, getAllUsers } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  }, [getAllUsers]);

  const [workers, setWorkers] = useState([
    { id: 1, name: "أحمد محمد", profession: "كهربائي", city: "الزهور", rating: 4.8, status: "active" },
    { id: 2, name: "مصطفى خالد", profession: "كهربائي", city: "الرفاعي", rating: 4.9, status: "active" },
    { id: 3, name: "حسن علي", profession: "سباك", city: "الزهور", rating: 4.7, status: "active" },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: "أحمد محمد", worker: "مصطفى خالد", service: "تركيب كهرباء", status: "completed", date: "2024-01-15" },
    { id: 2, customer: "سارة خالد", worker: "حسن علي", service: "إصلاح تسريب", status: "pending", date: "2024-01-16" },
    { id: 3, customer: "محمد علي", worker: "أحمد محمد", service: "صيانة كهرباء", status: "in_progress", date: "2024-01-17" },
  ]);

  const [professions, setProfessions] = useState([
    { id: 1, name: "كهربائي", count: 25 },
    { id: 2, name: "سباك", count: 18 },
    { id: 3, name: "نجار", count: 15 },
    { id: 4, name: "صباغ", count: 12 },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const refreshUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleBlockUser = (userId) => {
    const targetUser = users.find(u => u.id === userId);
    const action = targetUser.status === "active" ? "حظر" : "تفعيل";
    if (window.confirm(`هل أنت متأكد من ${action} هذا المستخدم؟`)) {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
      ));
    }
  };

  const handleDeleteWorker = (workerId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الحرفي؟")) {
      setWorkers(workers.filter(w => w.id !== workerId));
    }
  };

  const handleDeleteProfession = (professionId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الحرفة؟")) {
      setProfessions(professions.filter(p => p.id !== professionId));
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "success",
      blocked: "error",
      completed: "success",
      pending: "warning",
      in_progress: "info",
    };
    return colors[status] || "default";
  };

  const getStatusText = (status) => {
    const texts = {
      active: "نشط",
      blocked: "محظور",
      completed: "مكتمل",
      pending: "قيد الانتظار",
      in_progress: "قيد التنفيذ",
    };
    return texts[status] || status;
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", pt: 10, pb: 4, direction: "rtl" }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            لوحة تحكم الأدمن
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {users.length}
                    </Typography>
                    <Typography variant="body2">المستخدمين</Typography>
                  </Box>
                  <People sx={{ fontSize: 50, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {workers.length}
                    </Typography>
                    <Typography variant="body2">الحرفيين</Typography>
                  </Box>
                  <Work sx={{ fontSize: 50, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {orders.length}
                    </Typography>
                    <Typography variant="body2">الطلبات</Typography>
                  </Box>
                  <Assignment sx={{ fontSize: 50, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "white" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {professions.length}
                    </Typography>
                    <Typography variant="body2">أنواع الحرف</Typography>
                  </Box>
                  <Star sx={{ fontSize: 50, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="المستخدمين" />
            <Tab label="الحرفيين" />
            <Tab label="الطلبات" />
            <Tab label="أنواع الحرف" />
          </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  إدارة المستخدمين
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={refreshUsers}
                  size="small"
                >
                  تحديث القائمة
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>الاسم</TableCell>
                      <TableCell>البريد الإلكتروني</TableCell>
                      <TableCell>الدور</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                            لا يوجد مستخدمين مسجلين حالياً
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role === "customer" ? "عميل" : "حرفي"} 
                              size="small"
                              color={user.role === "customer" ? "primary" : "secondary"}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getStatusText(user.status)} 
                              size="small"
                              color={getStatusColor(user.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color={user.status === "active" ? "warning" : "success"}
                              onClick={() => handleBlockUser(user.id)}
                            >
                              {user.status === "active" ? <Block /> : <CheckCircle />}
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                إدارة الحرفيين
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>الاسم</TableCell>
                      <TableCell>المهنة</TableCell>
                      <TableCell>المدينة</TableCell>
                      <TableCell>التقييم</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>{worker.name}</TableCell>
                        <TableCell>{worker.profession}</TableCell>
                        <TableCell>{worker.city}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexDirection: "row-reverse" }}>
                            <Star sx={{ color: "#ffc107", fontSize: 18 }} />
                            <Typography variant="body2">{worker.rating}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={getStatusText(worker.status)} 
                            size="small"
                            color={getStatusColor(worker.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog("editWorker", worker)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteWorker(worker.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                إدارة الطلبات
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>العميل</TableCell>
                      <TableCell>الحرفي</TableCell>
                      <TableCell>الخدمة</TableCell>
                      <TableCell>التاريخ</TableCell>
                      <TableCell>الحالة</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.worker}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={getStatusText(order.status)} 
                            size="small"
                            color={getStatusColor(order.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  إدارة أنواع الحرف
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => handleOpenDialog("addProfession")}
                >
                  إضافة حرفة جديدة
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>اسم الحرفة</TableCell>
                      <TableCell>عدد الحرفيين</TableCell>
                      <TableCell>الإجراءات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {professions.map((profession) => (
                      <TableRow key={profession.id}>
                        <TableCell>{profession.name}</TableCell>
                        <TableCell>{profession.count}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog("editProfession", profession)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteProfession(profession.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {dialogType === "addProfession" && "إضافة حرفة جديدة"}
            {dialogType === "editProfession" && "تعديل الحرفة"}
            {dialogType === "editWorker" && "تعديل بيانات الحرفي"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="الاسم"
                defaultValue={selectedItem?.name || ""}
                sx={{ mb: 2 }}
                dir="rtl"
              />
              {dialogType === "editWorker" && (
                <>
                  <TextField
                    fullWidth
                    label="المهنة"
                    defaultValue={selectedItem?.profession || ""}
                    sx={{ mb: 2 }}
                    dir="rtl"
                  />
                  <TextField
                    fullWidth
                    label="المدينة"
                    defaultValue={selectedItem?.city || ""}
                    dir="rtl"
                  />
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>إلغاء</Button>
            <Button variant="contained" onClick={handleCloseDialog}>
              حفظ
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
