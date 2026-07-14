import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function GroupDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [group, setGroup] = useState(null);

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
                <p>No members yet.</p>

            <hr />

            <h2>Expenses</h2>
            <p>No expenses yet.</p>

        </div>

    );
}

export default GroupDetails;