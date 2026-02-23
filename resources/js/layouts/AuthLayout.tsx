import { Navigate, Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
    IconDashboard,
    IconFileAi,
    IconFileDescription,
    IconHealthRecognition,
    IconHelp,
    IconSearch,
    IconSettings,
} from "@tabler/icons-react";
import data from "../lib/data.json";
import { NavDocuments } from "@/components/nav-documents";
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
    const menuItems = {
        user: user,
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: IconDashboard,
            },
            {
                title: "Health",
                url: "/health",
                icon: IconHealthRecognition,
            },
        ],
        navDocuments: [
            {
                title: "All Documents",
                url: "#",
                icon: IconFileDescription,
            },
            {
                title: "Shared with me",
                url: "#",
                icon: IconFileAi,
            },
        ],
        navSecondary: [
            {
                title: "Settings",
                url: "#",
                icon: IconSettings,
            },
            {
                title: "Get Help",
                url: "#",
                icon: IconHelp,
            },
            {
                title: "Search",
                url: "#",
                icon: IconSearch,
            },
        ],
    };
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar data={menuItems} variant="inset" />
            <SidebarInset>
                <SiteHeader items={menuItems.navMain} />
                <div className="flex flex-1 flex-col">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
