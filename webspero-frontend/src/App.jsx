import * as React from "react";
import Container from "@mui/material/Container";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function App() {
  return (
    <Container>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </Container>
  );
}
