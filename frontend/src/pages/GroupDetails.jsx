import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function GroupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/", { replace: true });
            return;
        }

        const fetchGroup = async () => {
            try {
                const response = await api.get(`/groups/group/${id}`);
                setGroup(response.data);

                const expenseResponse = await api.get(`/expenses/group/${id}`);
                setExpenses(expenseResponse.data);

                const balanceResponse = await api.get(`/expenses/group/${id}/balances`);
                setBalances(balanceResponse.data);
            } catch (error) {
                console.log(error);
                alert("Failed to load group.");
            }
        };

        fetchGroup();
    }, [id, navigate]);

    const copyInviteCode = () => {
        navigator.clipboard.writeText(group.joinCode);
        alert("Invite code copied!");
    };

    if (!group) {
        return <h2 className="p-4">Loading...</h2>;
    }

    const memberCount = group.members && group.members.length > 0 ? group.members.length : 0;

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

                            <hr className="dashboard-divider" />

                            <div className="dashboard-section-title">Current Group</div>
                            <div className="dashboard-group-item d-block">
                                <div className="dashboard-group-name">{group.name}</div>
                                <div className="dashboard-group-meta">{memberCount} members</div>
                                <div className="group-code-pill mt-3">
                                    <i className="bi bi-key"></i>
                                    {group.joinCode}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="col-12 col-lg-9">
                        <div className="group-details-card">
                            <div className="group-details-header">
                                <div>
                                    <div className="group-details-eyebrow">Group overview</div>
                                    <h1 className="group-details-title">{group.name}</h1>
                                    <div className="group-details-meta-row">
                                        <span className="group-details-meta-pill">
                                            <i className="bi bi-people"></i>
                                            {memberCount} members
                                        </span>
                                        <span className="group-details-meta-pill">
                                            <i className="bi bi-key"></i>
                                            {group.joinCode}
                                        </span>
                                        {group.createdAt ? (
                                            <span className="group-details-meta-pill">
                                                <i className="bi bi-calendar3"></i>
                                                {new Date(group.createdAt).toLocaleDateString()}
                                            </span>
                                        ) : null}
                                    </div>
                                    {group.description ? (
                                        <p className="group-details-description">{group.description}</p>
                                    ) : null}
                                </div>

                                <div className="group-details-actions">
                                    <button type="button" className="btn btn-primary" onClick={() => navigate(`/group/${id}/add-expense`)}>
                                        <i className="bi bi-plus-circle"></i>
                                        Add Expense
                                    </button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/group/${id}/settlements`)}>
                                        <i className="bi bi-currency-exchange"></i>
                                        View Settlements
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                                        <i className="bi bi-arrow-left"></i>
                                        Back
                                    </button>
                                </div>
                            </div>

                            <div className="row g-4 mt-2">
                                <div className="col-12 col-lg-8">
                                    <div className="group-details-panel">
                                        <div className="group-panel-header">
                                            <div>
                                                <h2 className="group-panel-title">Expenses</h2>
                                                <p className="group-panel-subtitle">Recent expenses in this group</p>
                                            </div>
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/group/${id}/add-expense`)}>
                                                <i className="bi bi-plus"></i>
                                                Add
                                            </button>
                                        </div>

                                        {expenses.length === 0 ? (
                                            <div className="group-empty-state">
                                                <div className="group-empty-icon">
                                                    <i className="bi bi-receipt"></i>
                                                </div>
                                                <h3>No expenses yet</h3>
                                                <p>Add your first shared expense.</p>
                                                <button type="button" className="btn btn-primary mt-3" onClick={() => navigate(`/group/${id}/add-expense`)}>
                                                    Add Expense
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="group-expense-list">
                                                {expenses.map((expense) => (
                                                    <div key={expense.id} className="group-expense-card">
                                                        <div className="group-expense-main">
                                                            <div className="group-expense-icon">
                                                                <i className="bi bi-receipt"></i>
                                                            </div>
                                                            <div>
                                                                <h4 className="group-expense-title">{expense.description}</h4>
                                                                <div className="group-expense-meta">
                                                                    <span>Paid by {expense.paidBy}</span>
                                                                    <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group-expense-amount">₹{Number(expense.amount).toFixed(2)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="group-details-panel">
                                        <div className="group-panel-header">
                                            <div>
                                                <h2 className="group-panel-title">Current Balances</h2>
                                                <p className="group-panel-subtitle">Member balances</p>
                                            </div>
                                        </div>

                                        {balances.length === 0 ? (
                                            <div className="group-balance-empty">No balances yet.</div>
                                        ) : (
                                            <div className="group-balance-list">
                                                {balances.map((balance) => (
                                                    <div key={balance.userId} className="group-balance-item">
                                                        <div className="group-balance-user">
                                                            <div className="group-avatar">{balance.userName ? balance.userName.charAt(0).toUpperCase() : "U"}</div>
                                                            <div>
                                                                <div className="group-balance-name">{balance.userName}</div>
                                                                <div className="group-balance-status">{balance.balance > 0 ? "Positive" : balance.balance < 0 ? "Negative" : "Settled"}</div>
                                                            </div>
                                                        </div>
                                                        {balance.balance > 0 ? (
                                                            <div className="group-balance-value positive">Gets back ₹{balance.balance.toFixed(2)}</div>
                                                        ) : balance.balance < 0 ? (
                                                            <div className="group-balance-value negative">Owes ₹{Math.abs(balance.balance).toFixed(2)}</div>
                                                        ) : (
                                                            <div className="group-balance-value neutral">Settled up</div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="group-details-panel mt-4">
                                        <div className="group-panel-header">
                                            <div>
                                                <h2 className="group-panel-title">Members</h2>
                                                <p className="group-panel-subtitle">Group participants</p>
                                            </div>
                                        </div>

                                        {group.members && group.members.length > 0 ? (
                                            <div className="group-member-list">
                                                {group.members.map((member) => (
                                                    <div key={member.id} className="group-member-chip">
                                                        <div className="group-avatar">{member.name ? member.name.charAt(0).toUpperCase() : "U"}</div>
                                                        <span>{member.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="group-balance-empty">No members yet.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default GroupDetails;