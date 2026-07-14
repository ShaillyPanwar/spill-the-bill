import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    useEffect(() => {

        const fetchGroups = async () => {

            const storedUser = localStorage.getItem("user");

            // redirect if user is not logged in
            if (!storedUser) {
                navigate("/", { replace: true });
                return;
            }

            const loggedInUser = JSON.parse(storedUser);
            setUser(loggedInUser);

            try {

                const response = await api.get(`/groups/${loggedInUser.id}`);
                setGroups(response.data);

            } catch (error) {

                console.log(error);
                alert("Failed to fetch groups");

            }
        };

        fetchGroups();

    }, [navigate]);

    return (
        <div>

            <h1>
                Welcome {user ? user.name : "User"} 👋
            </h1>

            <br />

            <button
                onClick={() => navigate("/create-group")}
                style={{ cursor: "pointer" }}
            >
                Create Group
            </button>

            <hr />

            <h2>My Groups</h2>

            {groups.length === 0 ? (
                <p>No groups found.</p>
            ) : (
                <ul>
                    {groups.map((group) => (
                        <li
                            key={group.id}
                            onClick={() => navigate(`/group/${group.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>{group.name}</strong>
                            <br />
                            {group.description}
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;