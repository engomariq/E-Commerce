import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/auth/RegisterForm";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import WorkersList from "./pages/WorkersList";
import WorkerProfile from "./pages/WorkerProfile";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/workers" element={<WorkersList />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;