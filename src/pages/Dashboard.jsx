import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    // If no token, user is not logged in
    if (!token) {
      navigate("/auth");
      return;
    }

    // Set username from localStorage
    setUsername(storedUsername);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/auth");
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h1 className="dash-welcome">
          Welcome, <span>{username}</span>
        </h1>

        <p className="dash-subtext">Glad to have you back.</p>

        <div className="dash-actions">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
