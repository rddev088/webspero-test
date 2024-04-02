import * as React from "react";
import Container from "@mui/material/Container";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";

export default function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UpdateProfile />} />
      </Routes>
    </Container>
  );
}
