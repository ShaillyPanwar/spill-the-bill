import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function JoinGroup() {
    const [joinCode, setJoinCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const joinGroup = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await api.post("/groups/join", {
                userId: user.id,
                joinCode: joinCode
            });

            alert(response.data.message);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Failed to join group.");
            } else {
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div className="dashboard-shell">
            <div className="container-fluid py-4 py-lg-5">
                <div className="row g-4">
                    <aside className="col-12 col-lg-3">
                        <div className="dashboard-sidebar">
                            <div className="dashboard-brand">
                                <div className="dashboard-brand-icon">
                                    <i className="bi bi-wallet2"></i>
                                </div>
                                <div>
                                    <div className="dashboard-brand-title">Spill the Bill</div>
                                    <div className="dashboard-brand-subtitle">Shared expenses</div>
                                </div>
                            </div>

                            <div className="dashboard-nav-group">
                                <button type="button" className="dashboard-nav-link" onClick={() => navigate("/dashboard")}>
                                    <i className="bi bi-grid"></i>
                                    Dashboard
                                </button>
                                <button type="button" className="dashboard-nav-link" onClick={() => navigate("/create-group")}>
                                    <i className="bi bi-plus-circle"></i>
                                    Create Group
                                </button>
                                <button type="button" className="dashboard-nav-link dashboard-nav-link-active" onClick={() => navigate("/join-group")}>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    Join Group
                                </button>
                            </div>
                        </div>
                    </aside>

                    <main className="col-12 col-lg-9">
                        <div className="expense-page-header">
                            <div>
                                <p className="dashboard-topbar-label">Join group</p>
                                <h1 className="dashboard-topbar-title">Join Group</h1>
                                <p className="expense-page-subtitle">Join an existing expense group using an invite code.</p>
                            </div>
                            <div className="expense-page-actions">
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                        </div>

                        <div className="expense-form-card create-group-card">
                            <div className="text-center mb-4">
                                <div className="create-group-icon">
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>
                                <h2 className="create-group-title">Join a Group</h2>
                                <p className="create-group-subtitle">Enter the invite code shared by your friend.</p>
                            </div>

                            <form onSubmit={joinGroup}>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="joinCode">
                                        Invite Code
                                    </label>
                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-key-fill"></i>
                                        </span>
                                        <input
                                            id="joinCode"
                                            className="form-control"
                                            type="text"
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                            placeholder="ABC123"
                                        />
                                    </div>
                                    <div className="create-group-helper">Invite codes are case-sensitive.</div>
                                </div>

                                <div className="expense-form-actions">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Join Group
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default JoinGroup;