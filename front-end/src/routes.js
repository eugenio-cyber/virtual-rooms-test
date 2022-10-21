import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";
import { useState } from "react";
import { getItem } from "./utils/storage";

const ProjectRoutes = () => {
  const ProtectRoutes = ({ redirectTo }) => {
    const isAuthenticated = getItem("name");

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  };

  const [url, setUrl] = useState("");
  const [urlCode, setUrlCode] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    url: "",
    connections: 0,
    messages: [],
  });

  return (
    <UserContext.Provider
      value={{
        message,
        setMessage,
        data,
        setData,
        url,
        setUrl,
        urlCode,
        setUrlCode,
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
