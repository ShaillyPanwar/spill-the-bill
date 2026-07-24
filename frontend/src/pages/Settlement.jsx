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

    return (
        <div className="container mt-4">

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate(`/group/${id}`)}
            >
                ← Back
            </button>

            <h2>Suggested Settlements</h2>

            {settlements.length === 0 ? (
                <div className="alert alert-success mt-3">
                    🎉 Everyone is settled up!
                </div>
            ) : (
                <div className="mt-3">

                    {settlements.map((settlement, index) => (

                        <div
                            key={index}
                            className="card mb-3 shadow-sm"
                        >
                            <div className="card-body">

                                <h5 className="mb-2">
                                    {settlement.fromUser}
                                    <span className="mx-3">➡️</span>
                                    {settlement.toUser}
                                </h5>

                                <h3 className="text-success">
                                    ₹{settlement.amount.toFixed(2)}
                                </h3>

                            </div>
                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Settlement;