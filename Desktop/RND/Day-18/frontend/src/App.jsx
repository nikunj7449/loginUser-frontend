import { Routes, Route } from "react-router-dom";
import LoginPage from "./controller/page/LoginPage";
import AdminDashboard from "./controller/admin/AdminDashboard";
import UserDashboard from "./controller/user/UserDashboard";
import ProtectedRoute from "./controller/ProtectedRoute"
import RegistrationPage from "./controller/page/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admindashboard" 
      element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>      
      } />
      <Route path="/userdashboard" 
      element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>      
      } />
      <Route path="/registration" element={<RegistrationPage/>} />
    </Routes>
  );
}

export default App;
