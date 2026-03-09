import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PfpPage from "./pages/Pfppage";
import "./App.css";
import ProfileToggle from "./components/ProfileToggle";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      {}
      <ProfileToggle />

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/pfp" element={user ? <PfpPage /> : <Navigate to="/auth" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
