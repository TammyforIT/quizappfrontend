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
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">
          Welcome, <span>{username}</span>
        </h1>

        <p className="page-subtext">Glad to have you back.</p>

        <div className="button-row">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
