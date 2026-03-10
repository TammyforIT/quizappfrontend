import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) {
      navigate("/auth");
      return;
    }
    setUser(saved);
  }, []);

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">
          Welcome back, <span>{user.username}</span>
        </h1>

        <div className="profile-card">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>
        </div>
      </div>
    </div>
  );
}
