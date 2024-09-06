import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import { ChatProvider } from "./context/ChatContext";
import { getItem } from "./utils/storage";

const ProjectRoutes = () => {
  const ProtectRoutes = ({ redirectTo }) => {
    const isAuthenticated = getItem("user_id");
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  };

  return (
    <ChatProvider>
      <Routes>
        <Route path='/'>
          <Route path='/' element={<CreateRoom />} />
          <Route path='/create-room' element={<CreateRoom />} />
        </Route>

        <Route element={<ProtectRoutes redirectTo='/' />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </ChatProvider>
  );
};

export default ProjectRoutes;
