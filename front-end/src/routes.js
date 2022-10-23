import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";
import { useState } from "react";
import { getItem } from "./utils/storage";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
socket.on("connect");

const ProjectRoutes = () => {
  const ProtectRoutes = ({ redirectTo }) => {
    const isAuthenticated = getItem("name");

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  };

  return (
    <UserContext.Provider
      value={{
        socket,
      }}
    >
      <Routes>
        <Route path='/'>
          <Route path='/' element={<CreateRoom />} />
          <Route path='/create-room' element={<CreateRoom />} />
        </Route>

        <Route element={<ProtectRoutes redirectTo='/' />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default ProjectRoutes;
