import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login        from "./pages/Login";
import AppLayout    from "./components/AppLayout";
import Dashboard    from "./pages/Dashboard";
import Blogs        from "./pages/Blogs";
import Jobs         from "./pages/Jobs";
import Applications from "./pages/Applications";
import Enquiries    from "./pages/Enquiries";
import Portfolio    from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import TeamMembers  from "./pages/TeamMembers";
import UsersRoles   from "./pages/UsersRoles";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" />;
};

// Only superadmin can access this route
const SuperAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const role  = localStorage.getItem("adminRole");
  if (!token) return <Navigate to="/login" />;
  if (role !== "superadmin") return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index            element={<Dashboard />} />
          <Route path="blogs"        element={<Blogs />} />
          <Route path="jobs"         element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="enquiries"    element={<Enquiries />} />
          <Route path="portfolio"    element={<Portfolio />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="team"         element={<TeamMembers />} />
          {/* Superadmin only */}
          <Route
            path="users"
            element={
              <SuperAdminRoute>
                <UsersRoles />
              </SuperAdminRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
