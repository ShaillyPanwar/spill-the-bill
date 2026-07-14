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
        <div>
            {!createdGroup ? (
                <>
                    <h1>Create Group</h1>
                    <form onSubmit={createGroup}>
                        <div>
                            <label>Group Name</label>
                            <br />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label>Description</label>
                            <br />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type="submit">
                            Create Group
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <h1>🎉 Group Created Successfully!</h1>
                    <h3>{createdGroup.name}</h3>
                    <p>
                        <strong>Invite Code:</strong>
                    </p>
                    <h2>{createdGroup.joinCode}</h2>
                    <button onClick={copyCode}>
                        Copy Invite Code
                    </button>
                    <br /><br />
                    <button onClick={() => navigate("/dashboard")}>
                        Go to Dashboard
                    </button>
                </>
            )}
        </div>
);
}

export default CreateGroup;