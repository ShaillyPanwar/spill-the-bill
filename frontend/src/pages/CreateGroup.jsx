import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateGroup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createdGroup, setCreatedGroup] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const createGroup = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await api.post("/groups", {
                name,
                description,
                createdBy: user.id
            });
            setCreatedGroup(response.data);
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Something went wrong!");
            }
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(createdGroup.joinCode);
        alert("Invite code copied!");
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
                                <button type="button" className="dashboard-nav-link dashboard-nav-link-active" onClick={() => navigate("/create-group")}>
                                    <i className="bi bi-plus-circle"></i>
                                    Create Group
                                </button>
                                <button type="button" className="dashboard-nav-link" onClick={() => navigate("/join-group")}>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    Join Group
                                </button>
                            </div>
                        </div>
                    </aside>

                    <main className="col-12 col-lg-9">
                        <div className="expense-page-header">
                            <div>
                                <p className="dashboard-topbar-label">New group</p>
                                <h1 className="dashboard-topbar-title">Create Group</h1>
                                <p className="expense-page-subtitle">Create a new group to start tracking shared expenses.</p>
                            </div>
                            <div className="expense-page-actions">
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                        </div>

                        {!createdGroup ? (
                            <div className="expense-form-card create-group-card">
                                <div className="text-center mb-4">
                                    <div className="create-group-icon">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <h2 className="create-group-title">Create a New Group</h2>
                                    <p className="create-group-subtitle">Invite friends and start splitting expenses together.</p>
                                </div>

                                <form onSubmit={createGroup}>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="groupName">
                                            Group Name
                                        </label>
                                        <div className="input-group auth-input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-people"></i>
                                            </span>
                                            <input
                                                id="groupName"
                                                className="form-control"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Goa Trip"
                                            />
                                        </div>
                                        <div className="create-group-helper">Choose a memorable name for your group.</div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="groupDescription">
                                            Description
                                        </label>
                                        <textarea
                                            id="groupDescription"
                                            className="form-control"
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Add a short note about the group"
                                        />
                                    </div>

                                    <div className="expense-form-actions">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Create Group
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="expense-form-card create-group-success-card">
                                <div className="text-center">
                                    <div className="create-group-icon success-icon">
                                        <i className="bi bi-check2-circle"></i>
                                    </div>
                                    <h2 className="create-group-title">Group Created Successfully!</h2>
                                    <h3 className="create-group-name">{createdGroup.name}</h3>
                                    <p className="create-group-subtitle">Share this invite code with your friends.</p>
                                    <div className="create-group-code">{createdGroup.joinCode}</div>
                                    <div className="expense-form-actions justify-content-center mt-4">
                                        <button type="button" className="btn btn-outline-primary" onClick={copyCode}>
                                            <i className="bi bi-copy"></i>
                                            Copy Invite Code
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={() => navigate("/dashboard")}>
                                            Go to Dashboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CreateGroup;