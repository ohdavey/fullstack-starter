import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@tabler/icons-react";
import { AuthUser } from "@/lib/auth";
import { Link } from "react-router-dom";

export function AppSidebar({
    data,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    data: {
        user: AuthUser | null;
        navMain: {
            title: string;
            url: string;
            icon?: Icon | undefined;
        }[];
        navDocuments: {
            title: string;
            url: string;
            icon?: Icon | undefined;
        }[];
        navSecondary: {
            title: string;
            url: string;
            icon?: Icon | undefined;
        }[];
    };
}) {
    const APP_NAME = import.meta.env.VITE_APP_NAME ?? "App";
    const APP_LOGO_URL = import.meta.env.VITE_APP_LOGO_URL ?? "";
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={APP_LOGO_URL}
                                    alt={` ${APP_NAME} Logo`}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
