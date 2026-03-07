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
    async function loadUser() {
      const res = await fetch(`${API}/api/users/me`);
      const data = await res.json();

      setUsername(data.username);
      setEmail(data.email);
      setBio(data.bio || "");
    }

    loadUser();
  }, []);

  // UPDATE USER
  async function handleUpdate() {
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("bio", bio);

    const res = await fetch(`${API}/api/users/update`, {
      method: "PUT",
      body: form
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
      return;
    }

    // ⭐ Save updated user to localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // ⭐ Navigate back to dashboard
    navigate("/dashboard");
  }

  // DELETE USER
  async function handleDelete() {
    const res = await fetch(`${API}/api/users/me`, {
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
    <div>
      <h2>Edit Profile</h2>

      <div
        style={{
          width: "200px",
          height: "200px",
          background: "#eee",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "20px"
        }}
      >
        <p><strong>Username:</strong> {username || "—"}</p>
        <p><strong>Email:</strong> {email || "—"}</p>
        <p><strong>Bio:</strong> {bio || "—"}</p>
      </div>

      <p>Username:</p>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <p>Email:</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <p>Bio:</p>
      <input value={bio} onChange={(e) => setBio(e.target.value)} />

      <br /><br />

      <button onClick={handleUpdate}>Save Changes</button>

      <br /><br />

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>

      <br /><br />

      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}
