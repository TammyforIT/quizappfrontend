import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileToggle() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  if (!savedUser) return null;

  return (
    <div className="pfp-toggle-wrapper">
      <div className="pfp-toggle" onClick={() => setOpen(!open)}>
        {savedUser.username}
      </div>

      {open && (
        <div className="pfp-menu">
          <p onClick={() => navigate("/pfp")}>Profile</p>
          <p onClick={() => {
            localStorage.removeItem("user");
            navigate("/auth");
          }}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
