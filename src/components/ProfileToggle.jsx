import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileToggle() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  if (!savedUser) return null;

  
  const initial = savedUser.username?.charAt(0)?.toUpperCase();

  return (
    <div className="pfp-toggle-wrapper">
      <div className="pfp-avatar" onClick={() => setOpen(!open)}>
        {initial}
      </div>

      {open && (
        <div className="pfp-menu">
          <p className="pfp-name">{savedUser.username}</p>
          <p className="pfp-email">{savedUser.email}</p>

          <hr />

          <p onClick={() => navigate("/pfp")}>Profile</p>
          <p
            onClick={() => {
              localStorage.removeItem("user");
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
