import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password
            });

            console.log(response.data);

            // 🔐 store token
            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            // redirect to dashboard
            navigate("/dashboard");

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