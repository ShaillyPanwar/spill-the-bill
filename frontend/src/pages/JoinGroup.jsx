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

        <div>

            <h1>Join Group</h1>

            <form onSubmit={joinGroup}>

                <label>Invite Code</label>

                <br />

                <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="Enter 6-character code"
                />

                <br /><br />

                <button type="submit">
                    Join Group
                </button>

            </form>

        </div>

    );
}

export default JoinGroup;