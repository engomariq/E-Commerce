import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/auth/RegisterForm";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import WorkersList from "./pages/WorkersList";
import WorkerProfile from "./pages/WorkerProfile";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/workers" element={<WorkersList />} />
            <Route path="/worker/:id" element={<WorkerProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
