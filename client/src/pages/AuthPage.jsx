import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const path = mode === "login" ? "/auth/login" : "/auth/register";

    try {
      const response = await api.post(path, formData);
      login(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Authentication failed. Check that API server is running on port 5002."
      );
    }
  };

  return (
    <main className="page auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{mode === "login" ? "Login" : "Create Account"}</h1>

        {mode === "register" && (
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
        )}

        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </label>

        {error && <p>{error}</p>}

        <button type="submit" className="solid-btn">
          {mode === "login" ? "Login" : "Register"}
        </button>

        <button
          type="button"
          className="ghost-btn"
          onClick={() => setMode((previous) => (previous === "login" ? "register" : "login"))}
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
        </button>
      </form>
    </main>
  );
}

export default AuthPage;
