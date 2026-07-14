import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateGroup() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

            await api.post("/groups", {
                name,
                description,
                createdBy: user.id
            });

            alert("Group created successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div>

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

        </div>
    );
}

export default CreateGroup;