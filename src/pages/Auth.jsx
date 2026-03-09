import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const [identifier, setIdentifier] = useState(""); // username OR email
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  // LOGIN
  async function handleLogin() {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier, // ⭐ user can type username OR email
          password
        })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  }

  // REGISTER
  async function handleRegister() {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Registration failed");
    }
  }

  // LOGOUT
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/auth");
  }

  return (
    <div>
      {savedUser ? (
        <div>
          <h2>Account Settings</h2>

          <button onClick={() => navigate("/pfp")}>
            Go to Profile Page
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <h2>{showLogin ? "Login" : "Register"}</h2>

          {showLogin ? (
            <div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Username or Email"
                onChange={(e) => setIdentifier(e.target.value)}
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleLogin}>Login</button>

              <p onClick={() => setShowLogin(false)}>
                Don't have an account? Register
              </p>
            </div>
          ) : (
            <div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button onClick={handleRegister}>Register</button>

              <p onClick={() => setShowLogin(true)}>
                Already have an account? Login
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
