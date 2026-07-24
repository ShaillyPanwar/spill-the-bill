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
        return <h2>Loading...</h2>;
    }

    return (

        <div>

            <button onClick={() => navigate(-1)}>
                ← Back
            </button>

            <h1>{group.name}</h1>

            <p>{group.description}</p>

            <hr />

                <h2>Invite Code</h2>

                <div
                    style={{
                        border: "2px solid #ccc",
                        padding: "12px",
                        width: "fit-content",
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "4px",
                        marginBottom: "10px"
                    }}
                >
                    {group.joinCode}
                </div>

                <button onClick={copyInviteCode}>
                    Copy Invite Code
                </button>

                <hr />

                <h2>Members</h2>
                {group.members && group.members.length > 0 ? (
                    <ul>
                        {group.members.map((member) => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No members yet.</p>
                )}

            <hr />

            <button
                onClick={() => navigate(`/group/${id}/add-expense`)}
            >
                + Add Expense
            </button>
            <h2>Balances</h2>
                {balances.length === 0 ? (
                    <p>No balances yet.</p>
                ) : (
                    balances.map((balance) => (
                        <div
                            key={balance.userId}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "8px"
                            }}
                        >
                            <h3>{balance.userName}</h3>

                            {balance.balance > 0 ? (
                                <p style={{ color: "green" }}>
                                    Gets back ₹{balance.balance.toFixed(2)}
                                </p>
                            ) : balance.balance < 0 ? (
                                <p style={{ color: "red" }}>
                                    Owes ₹{Math.abs(balance.balance).toFixed(2)}
                                </p>
                            ) : (
                                <p style={{ color: "gray" }}>
                                    Settled up
                                </p>
                            )}
                        </div>
                    ))
                )}

                <button
                    className="btn btn-success me-2"
                    onClick={() => navigate(`/group/${id}/settlements`)}
                >
                    View Settlements
                </button>

            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses yet.</p>
            ) : (
                expenses.map((expense) => (
                    <div
                        key={expense.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <hr />
                        <h3>{expense.description}</h3>
                        <p>₹ {expense.amount}</p>
                        <p>Paid by {expense.paidBy}</p>
                        <p>
                            {new Date(expense.createdAt).toLocaleDateString()}{","}
                            {new Date(expense.createdAt).toLocaleTimeString()}
                        </p>
                    </div>
                ))
            )}
                
        </div>
        
    );
}

export default GroupDetails;