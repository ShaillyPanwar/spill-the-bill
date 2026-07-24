import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    useEffect(() => {
        const fetchGroups = async () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                navigate("/", { replace: true });
                return;
            }

            const loggedInUser = JSON.parse(storedUser);
            setUser(loggedInUser);

            try {
                const response = await api.get(`/groups/${loggedInUser.id}`);
                setGroups(response.data);
            } catch (error) {
                console.log(error);
                alert("Failed to fetch groups");
            }
        };

        fetchGroups();
    }, [navigate]);

    return (
        <div className="dashboard-shell">
            <div className="container-fluid py-4 py-lg-5">
                <div className="dashboard-topbar">
                    <div>
                        <p className="dashboard-topbar-label">Overview</p>
                        <h1 className="dashboard-topbar-title">Dashboard</h1>
                    </div>
                    <div className="dashboard-topbar-actions">
                        <span className="dashboard-user-pill">
                            <i className="bi bi-person-circle"></i>
                            {user ? user.name : "User"}
                        </span>
                        <button type="button" className="btn btn-outline-primary dashboard-logout-btn" onClick={logout}>
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="row g-4 mt-1">
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
                                <button type="button" className="dashboard-nav-link dashboard-nav-link-active" onClick={() => navigate("/dashboard")}>
                                    <i className="bi bi-grid"></i>
                                    Dashboard
                                </button>
                                <button type="button" className="dashboard-nav-link" onClick={() => navigate("/create-group")}>
                                    <i className="bi bi-plus-circle"></i>
                                    Create Group
                                </button>
                                <button type="button" className="dashboard-nav-link" onClick={() => navigate("/join-group")}>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    Join Group
                                </button>
                            </div>

                            <hr className="dashboard-divider" />

                            <div className="dashboard-section-title">Your Groups</div>

                            <div className="dashboard-group-list">
                                {groups.length === 0 ? (
                                    <div className="dashboard-sidebar-empty">No groups yet</div>
                                ) : (
                                    groups.map((group) => (
                                        <button
                                            key={group.id}
                                            type="button"
                                            className="dashboard-group-item"
                                            onClick={() => navigate(`/group/${group.id}`)}
                                        >
                                            <div className="dashboard-group-icon">
                                                <i className="bi bi-people"></i>
                                            </div>
                                            <div className="text-start">
                                                <div className="dashboard-group-name">{group.name}</div>
                                                {group.description ? (
                                                    <div className="dashboard-group-meta">{group.description}</div>
                                                ) : null}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>

                    <main className="col-12 col-lg-6">
                        <div className="dashboard-hero-card">
                            <div className="dashboard-hero-content">
                                <p className="dashboard-eyebrow">Welcome back</p>
                                <h2 className="dashboard-hero-title">Welcome back, {user ? user.name : "User"}</h2>
                                <p className="dashboard-hero-subtitle">Manage your shared expenses effortlessly.</p>
                            </div>
                        </div>

                        {groups.length === 0 ? (
                            <div className="dashboard-empty-state">
                                <div className="dashboard-empty-icon">
                                    <i className="bi bi-people"></i>
                                </div>
                                <h3>No groups yet</h3>
                                <p>Create a group or join one using an invite code.</p>
                                <div className="dashboard-empty-actions">
                                    <button type="button" className="btn btn-primary" onClick={() => navigate("/create-group")}>
                                        Create Group
                                    </button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/join-group")}>
                                        Join Group
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="dashboard-content-card">
                                <div className="dashboard-section-heading">
                                    <div>
                                        <h3 className="dashboard-panel-title">My Groups</h3>
                                        <p className="dashboard-panel-subtitle">Click a group to view details.</p>
                                    </div>
                                </div>

                                <div className="dashboard-groups-stack">
                                    {groups.map((group) => (
                                        <button
                                            key={group.id}
                                            type="button"
                                            className="dashboard-group-card"
                                            onClick={() => navigate(`/group/${group.id}`)}
                                        >
                                            <div className="dashboard-group-card-content">
                                                <div>
                                                    <h4 className="dashboard-group-card-title">{group.name}</h4>
                                                    {group.description ? (
                                                        <p className="dashboard-group-card-description">{group.description}</p>
                                                    ) : null}
                                                </div>
                                                <span className="dashboard-group-card-icon">
                                                    <i className="bi bi-arrow-right"></i>
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>

                    <aside className="col-12 col-lg-3">
                        <div className="dashboard-action-card">
                            <h3 className="dashboard-action-title">Quick Actions</h3>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-primary" onClick={() => navigate("/create-group")}>
                                    Create Group
                                </button>
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/join-group")}>
                                    Join Group
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;