import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PfpPage from "./pages/Pfppage";
import "./App.css";
import pfptoggle from "./components/pfptoggle";


function App() {
  // Read user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Auth />}
        />

        {/* Auth page */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />

        <Route
          path="/pfp"
          element={user ? <PfpPage /> : <Navigate to="/auth" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
