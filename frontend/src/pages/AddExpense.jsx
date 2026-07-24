import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function AddExpense() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [members, setMembers] = useState([]);
    const [participantIds, setParticipantIds] = useState([]);
    const [paidBy, setPaidBy] = useState("");

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await api.get(`/groups/group/${id}`);
                setMembers(response.data.members);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGroup();
    }, [id]);

    const handleParticipantChange = (memberId) => {
        if (participantIds.includes(memberId)) {
            setParticipantIds(participantIds.filter((id) => id !== memberId));
        } else {
            setParticipantIds([...participantIds, memberId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/expenses", {
                groupId: Number(id),
                description,
                amount: Number(amount),
                paidBy: Number(paidBy),
                participantIds
            });
            navigate(`/group/${id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to add expense");
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
                                <p className="dashboard-topbar-label">New entry</p>
                                <h1 className="dashboard-topbar-title">Add Expense</h1>
                                <p className="expense-page-subtitle">Record a shared expense for this group.</p>
                            </div>
                            <div className="expense-page-actions">
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                        </div>

                        <div className="expense-form-card">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="description">
                                        Expense Description
                                    </label>
                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-receipt"></i>
                                        </span>
                                        <input
                                            id="description"
                                            className="form-control"
                                            type="text"
                                            placeholder="Dinner, groceries, taxi..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="amount">
                                        Amount
                                    </label>
                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-currency-rupee"></i>
                                        </span>
                                        <input
                                            id="amount"
                                            className="form-control expense-amount-input"
                                            type="number"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="paidBy">
                                        Paid By
                                    </label>
                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-person-circle"></i>
                                        </span>
                                        <select
                                            id="paidBy"
                                            className="form-select"
                                            value={paidBy}
                                            onChange={(e) => setPaidBy(e.target.value)}
                                        >
                                            <option value="">Select Payer</option>
                                            {members.map((member) => (
                                                <option key={member.id} value={member.id}>
                                                    {member.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Participants</label>
                                    {members.length === 0 ? (
                                        <div className="expense-empty-state">
                                            <div className="expense-empty-icon">
                                                <i className="bi bi-people"></i>
                                            </div>

                                            <h3>No members found</h3>
                                            <p>Invite members before adding expenses.</p>
                                        </div>
                                    ) : (

                                        <div className="expense-participant-list">

                                            {members.map((member) => (

                                                <div
                                                    key={member.id}
                                                    className="form-check expense-checkbox"
                                                >

                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`member-${member.id}`}
                                                        checked={participantIds.includes(member.id)}
                                                        onChange={() => handleParticipantChange(member.id)}
                                                    />
                                                    <label
                                                        className="form-check-label d-flex align-items-center"
                                                        htmlFor={`member-${member.id}`}
                                                    >
                                                        <div className="expense-avatar">
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span>{member.name}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="expense-form-actions">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Expense
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

export default AddExpense;