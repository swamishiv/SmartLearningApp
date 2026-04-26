import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // 🔁 Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      const routeMap = {
        STU: "/student/dashboard",
        TCH: "/teacher/dashboard",
        ADM: "/admin/dashboard"
      };

      navigate(routeMap[user.roleCode], { replace: true });
    }
  }, [user]);

  // 🔐 Handle Login
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password
      });

      const userData = response.data;

      // ✅ Store in AuthContext (handles localStorage internally)
      login(userData);

      alert("Login Successful");

      // 🔁 Redirect based on role
      const routeMap = {
        STU: "/student/dashboard",
        TCH: "/teacher/dashboard",
        ADM: "/admin/dashboard"
      };

      navigate(routeMap[userData.roleCode], { replace: true });

    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>SmartLearning Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleLogin} style={{ width: "100%" }}>
        Login
      </button>
    </div>
  );
}