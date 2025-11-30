import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
      return "Please fill all fields";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Registration failed");
      } else {
        navigate("/login");
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1EA]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#4A2E14]">Create Account</h2>
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-2">{error}</p>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 mb-3 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 mb-3 rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 mb-3 rounded" />
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full border p-2 mb-3 rounded" />
        <button type="submit" disabled={loading} className="w-full bg-[#8B5E3C] text-white py-2 rounded hover:bg-[#734a2e]">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm mt-4 text-center">Already have an account? <Link to="/login" className="text-[#8B5E3C] font-semibold">Login</Link></p>
      </form>
    </div>
  );
}