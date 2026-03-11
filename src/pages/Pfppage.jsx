import "./Pfppage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PfpPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));

    // ⭐ FIX: If no user OR missing _id → redirect
    if (!saved || !saved._id) {
      navigate("/auth");
      return;
    }

    // ⭐ FIX: Ensure all fields exist
    setUser(saved);
    setUsername(saved.username || "");
    setEmail(saved.email || "");
    setBio(saved.bio || "");
  }, [navigate]);

  function handleSave() {
    const updated = {
      ...user,
      username,
      email,
      bio
    };

    // ⭐ FIX: Always save the updated user object
    localStorage.setItem("user", JSON.stringify(updated));

    setSavedMessage("Saved!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  }

  function handleDelete() {
    // ⭐ FIX: Only remove local user (your backend delete is separate)
    localStorage.removeItem("user");
    alert("Account deleted.");
    navigate("/auth");
  }

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">Edit Profile</h1>

        {savedMessage && <p className="success-msg">{savedMessage}</p>}

        <input
          className="profile-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className="profile-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="profile-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        <div className="button-row">
          <button className="btn-main" onClick={handleSave}>Save Changes</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      </div>
    </div>
  );
}
