import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import Health from "./pages/Health";

export default function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <Routes>
                {/* Guest routes — redirect to /dashboard if already authenticated */}
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Auth-protected routes — redirect to /login if not authenticated */}
                <Route element={<AuthLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/health" element={<Health />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ThemeProvider>
    );
}
