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
    if (!saved) {
      navigate("/auth");
      return;
    }

    setUser(saved);
    setUsername(saved.username);
    setEmail(saved.email);
    setBio(saved.bio || "");
  }, []);

  function handleSave() {
    const updated = { ...user, username, email, bio };
    localStorage.setItem("user", JSON.stringify(updated));

    setSavedMessage("Saved!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  }

  function handleDelete() {
    localStorage.removeItem("user");
    alert("Account deleted.");
    navigate("/auth");
  }

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">Edit Profile</h1>

        {savedMessage && (
          <p className="success-msg">{savedMessage}</p>
        )}

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
