import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/auth");
      return;
    }
    setUser(savedUser);
  }, []);

  if (!user) return null;

  return (
    <div className="dash-wrapper">
      <div className="dash-card">
        <h1 className="dash-title">Welcome back, {user.username}</h1>

        <div className="dash-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>
        </div>
      </div>
    </div>
  );
}
