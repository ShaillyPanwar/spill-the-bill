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
            setParticipantIds(
                participantIds.filter(id => id !== memberId)
            );
        } else {
            setParticipantIds(
                [...participantIds, memberId]
            );
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
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br /><br />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <br /><br />
                <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                >
                    <option value="">Select Payer</option>
                    {members.map((member) => (
                        <option
                            key={member.id}
                            value={member.id}
                        >
                            {member.name}
                        </option>

                    ))}

                </select>

                <br /><br />
                <h3>Participants</h3>
                {members.map((member) => (
                    <div key={member.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={participantIds.includes(member.id)}
                                onChange={() => handleParticipantChange(member.id)}
                            />
                            {member.name}
                        </label>
                    </div>
                ))}

                <button type="submit">
                    Add Expense
                </button>
            </form>
            <br />
            <button onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default AddExpense;