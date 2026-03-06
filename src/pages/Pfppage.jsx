import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PfpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // 
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("http://localhost:5000/api/users/me");
      const data = await res.json();

      setUsername(data.username);
      setEmail(data.email);
      setBio(data.bio);
    }

    loadUser();
  }, []);

  // UPDATE USER INFO
  async function handleUpdate() {
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("bio", bio);

    await fetch("http://localhost:5000/api/users/update", {
      method: "PUT",
      body: form
    });

    alert("Profile updated!");
  }

  // DELETE USER
  async function handleDelete() {
    await fetch("http://localhost:5000/api/users/me", {
      method: "DELETE"
    });

    alert("Account deleted");
    navigate("/auth");
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

      <button onClick={handleDelete}>Delete Account</button>

      <br /><br />

      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

//handles are event handlers. onclick is react. you click and activate handlers.