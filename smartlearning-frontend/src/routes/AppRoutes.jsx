import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import StudentDashboard from "../pages/Students/Dashboard";
import TeacherDashboard from "../pages/Teacher/Dashboard";
import AdminDashboard from "../pages/Admin/Dashboard";

import CreateUser from "../pages/Users/CreateUser";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* 🔐 LOGIN */}
                <Route path="/" element={<Login />} />

                {/* 🧱 ALL APP ROUTES */}
                <Route element={<MainLayout />}>

                    {/* 👨‍🎓 STUDENT ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={["STU"]} />}>
                        <Route path="student/dashboard" element={<StudentDashboard />} />
                    </Route>

                    {/* 👨‍🏫 TEACHER ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={["TCH"]} />}>
                        <Route path="teacher/dashboard" element={<TeacherDashboard />} />
                    </Route>

                    {/* 👨‍💼 ADMIN ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={["ADM"]} />}>
                        <Route path="admin/dashboard" element={<AdminDashboard />} />
                        <Route path="users/create" element={<CreateUser />} />
                    </Route>

                    {/* COMMON ROUTE (ALL ROLES) */}
                    <Route element={<ProtectedRoute allowedRoles={["STD", "TCH", "ADM"]} />}>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}