import Home from "./sheets/home/home";
import Profile from "./sheets/home/profile/profile";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { Routes, Route } from "react-router-dom";
import { Switch } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
