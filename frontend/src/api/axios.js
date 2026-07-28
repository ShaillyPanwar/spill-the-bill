import axios from "axios";

const api = axios.create({
    baseURL: "https://spill-the-bill.onrender.com/api/",
});

export default api;