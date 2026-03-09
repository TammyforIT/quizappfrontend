import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/auth");
      return;
    }

    setUsername(savedUser.username);
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/auth");
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
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
