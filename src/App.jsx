import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import quiz from "./pages/quiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<quiz />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
