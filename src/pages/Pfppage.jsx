import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PfpPage() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // LOAD USER INFO
  useEffect(() => {
    if (!savedUser) {
      navigate("/auth");
      return;
    }

    async function loadUser() {
      const res = await fetch(`${API}/api/user/me?id=${savedUser._id}`);
      const data = await res.json();

      setUsername(data.username);
      setEmail(data.email);
      setBio(data.bio || "");
    }

    loadUser();
  }, []);

  // UPDATE USER
  async function handleUpdate() {
    const res = await fetch(`${API}/api/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: savedUser._id,
        username,
        email,
        bio
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  }

  // DELETE USER
  async function handleDelete() {
    const res = await fetch(`${API}/api/user/delete?id=${savedUser._id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      localStorage.removeItem("user");
      alert("Account deleted");
      navigate("/auth");
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div className="page-wrapper">
      <div className="glass-panel">

        <h1 className="page-title">
          Edit <span>Profile</span>
        </h1>

        <p className="page-subtext">Update your account details below.</p>

        <div className="profile-card">
          <p><strong>Username:</strong> {username || "—"}</p>
          <p><strong>Email:</strong> {email || "—"}</p>
          <p><strong>Bio:</strong> {bio || "—"}</p>
        </div>

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
          <button onClick={handleUpdate}>Save Changes</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>

        <div className="button-row">
          <button onClick={() => navigate("/dashboard")}>Back</button>
        </div>

      </div>
    </div>
  );
}
