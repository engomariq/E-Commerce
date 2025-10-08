import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/auth/RegisterForm";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
