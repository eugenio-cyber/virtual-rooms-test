import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";

const ProjectRoutes = () => {
  const ProtectRoutes = (redirectTo) => {
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  };

  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<CreateRoom />} />
        <Route path='/create-room' element={<CreateRoom />} />
      </Route>

      <Route element={<ProtectRoutes redirectTo='/' />}>
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
