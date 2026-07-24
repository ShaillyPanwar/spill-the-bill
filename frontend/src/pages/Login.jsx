import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Login() {
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
        <div className="auth-shell">
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center min-vh-100">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

                        <div className="auth-card p-5">

                            <div className="text-center" style={{ marginTop: "32px" }}>

                                <div className="auth-logo mb-4">
                                    <i className="bi bi-wallet2-fill"></i>
                                </div>

                                <h1 className="auth-title">
                                    Welcome Back 
                                </h1>

                                <p className="auth-subtitle">
                                    Split expenses with friends effortlessly.
                                </p>

                            </div>

                            <form onSubmit={loginUser}>

                                {/* Email */}
                                <div className="mb-4">

                                    <label 
                                        className="form-label" 
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>

                                    <div className="input-group auth-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>

                                        <input
                                            id="email"
                                            className="form-control"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                        />

                                    </div>

                                </div>



                                {/* Password */}
                                <div className="mb-4">

                                    <label 
                                        className="form-label" 
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>


                                    <div className="input-group auth-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>


                                        <input
                                            id="password"
                                            className="form-control"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />

                                    </div>

                                </div>


                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 auth-button"
                                >
                                    Sign In
                                </button>


                            </form>



                            <div className="text-center" style={{ marginTop: "32px" }}>

                                <span className="auth-help">
                                    New here?
                                </span>


                                <Link
                                    to="/register"
                                    className="auth-link ms-2"
                                >
                                    Create an account
                                </Link>

                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


export default Login;