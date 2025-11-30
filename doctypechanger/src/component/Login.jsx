import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("Please fill all fields");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCC7AA]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#4E342E]">Login</h2>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-2">{error}</p>}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 mb-3 rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 mb-3 rounded" />
        <button type="submit" disabled={loading} className="w-full bg-[#8B5E3C] text-white py-2 rounded hover:bg-[#734a2e]">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}