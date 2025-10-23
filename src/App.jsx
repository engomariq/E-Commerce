 import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/auth/RegisterForm";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import WorkersList from "./pages/WorkersList";
import WorkerProfile from "./pages/WorkerProfile";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/workers" element={<WorkersList />} />
            <Route path="/worker/:id" element={<WorkerProfile />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
