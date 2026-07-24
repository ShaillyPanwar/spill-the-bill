import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Settlement() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [settlements, setSettlements] = useState([]);

    useEffect(() => {
        fetchSettlements();
    }, []);

    const fetchSettlements = async () => {
        try {
            const response = await api.get(`/expenses/group/${id}/settlements`);
            setSettlements(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load settlements");
        }
    };

    const markAsSettled = (indexToRemove) => {
        setSettlements((currentSettlements) => currentSettlements.filter((_, index) => index !== indexToRemove));
        // TODO: Replace this frontend-only state update with the backend API call later.
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
                                <p className="dashboard-topbar-label">Balances</p>
                                <h1 className="dashboard-topbar-title">Suggested Settlements</h1>
                                <p className="expense-page-subtitle">Settle balances with the minimum number of transactions.</p>
                            </div>
                            <div className="expense-page-actions">
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/group/${id}`)}>
                                    <i className="bi bi-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                        </div>

                        {settlements.length === 0 ? (
                            <div className="settlement-empty-card">
                                <div className="settlement-empty-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <h3>Everyone is settled up!</h3>
                                <p>There are no pending payments in this group.</p>
                            </div>
                        ) : (
                            <div className="settlement-list">
                                {settlements.map((settlement, index) => (
                                    <div key={index} className="settlement-card d-flex align-items-center justify-content-between">
                                        <div className="settlement-person d-flex align-items-center gap-3 flex-grow-1">
                                            <div className="settlement-avatar">{settlement.fromUser ? settlement.fromUser.charAt(0).toUpperCase() : "U"}</div>
                                            <div>
                                                <div className="settlement-name">{settlement.fromUser}</div>
                                                <div className="settlement-role">Pays</div>
                                            </div>
                                        </div>

                                        <div className="settlement-middle d-flex align-items-center justify-content-center gap-3 px-3">
                                            <i className="bi bi-arrow-right"></i>
                                            <div className="settlement-amount-badge">₹{Number(settlement.amount).toFixed(2)}</div>
                                        </div>

                                        <div className="settlement-person d-flex align-items-center gap-3 flex-grow-1 justify-content-end text-end">
                                            <div>
                                                <div className="settlement-name">{settlement.toUser}</div>
                                                <div className="settlement-role">Gets back</div>
                                            </div>
                                            <div className="settlement-avatar">{settlement.toUser ? settlement.toUser.charAt(0).toUpperCase() : "U"}</div>
                                        </div>

                                        <button type="button" className="btn btn-outline-primary btn-sm settlement-action-btn" onClick={() => markAsSettled(index)}>
                                            <i className="bi bi-check2-circle"></i>
                                            Mark as Settled
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Settlement;