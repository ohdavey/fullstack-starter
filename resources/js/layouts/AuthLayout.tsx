import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function AuthLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="text-muted-foreground text-sm">Loading…</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
