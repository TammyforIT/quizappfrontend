import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProfileToggle.css";

export default function ProfileToggle() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const initial = user.username?.charAt(0)?.toUpperCase();

  return (
    <div className="pfp-toggle-wrapper">
      <div className="pfp-avatar" onClick={() => setOpen(!open)}>
        {initial}
      </div>

      {open && (
        <div className="pfp-menu">
          <p className="pfp-name">{user.username}</p>
          <p className="pfp-email">{user.email}</p>

          <hr />

          <p onClick={() => navigate("/pfp")}>Profile</p>

          <p
            onClick={() => {
              localStorage.removeItem("user");
              alert("Successfully logged out!");
              navigate("/auth");
            }}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
