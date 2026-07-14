import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/auth/login", {
            email,
            password
        });
        
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

         alert("Login Successful!");
         navigate("/dashboard");
    } catch (error) {
        console.log(error);
        if (error.response) {
        alert(error.response.data);
        } else {
        alert("Something went wrong!");
        }
    }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );

}

export default Login;