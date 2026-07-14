import { BrowserRouter, Routes, Route } from "react-router-dom";

import GroupDetails from "./pages/GroupDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-group" element={<CreateGroup />} />

        <Route path="/group/:id" element={<GroupDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;