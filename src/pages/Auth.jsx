import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Check if user is already logged in
  const savedUser = JSON.parse(localStorage.getItem("user"));

  // LOGIN
  async function handleLogin() {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      body: form
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (res.ok) {
      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect
      navigate("/dashboard");
    } else {
      alert(data.message || "Invalid login");
    }
  }

  // REGISTER
  async function handleRegister() {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);

    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      body: form
    });

    const data = await res.json();
    console.log("REGISTER RESPONSE:", data);

    if (res.ok) {
      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect
      navigate("/dashboard");
    } else {
      alert(data.message || "Registration failed");
    }
  }

  // LOGOUT
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/auth");
  }

  return (
    <div>
      {/* If logged in, show Account Settings */}
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
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
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
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
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
