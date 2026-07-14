import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registerUser = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/auth/register", {
            name,
            email,
            password
        });

         alert("Registration Successful!");
         navigate("/");
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
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <div>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <br />
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
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;