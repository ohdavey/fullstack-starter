import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";

type Health = { status: string; db: boolean; redis: boolean };

export default function Dashboard() {
    const { user } = useAuth();
    const [health, setHealth] = useState<Health | null>(null);

    useEffect(() => {
        apiFetch<Health>("/health")
            .then(setHealth)
            .catch(() => {});
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Scaffold Health Check</CardTitle>
                    {user && (
                        <p className="text-sm text-muted-foreground">
                            Signed in as <strong>{user.name}</strong>
                        </p>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">API</span>
                        <Badge variant={health ? "default" : "secondary"}>
                            {health ? "ok" : "checking..."}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">MySQL</span>
                        <Badge variant={health?.db ? "default" : "destructive"}>
                            {health
                                ? health.db
                                    ? "connected"
                                    : "error"
                                : "checking..."}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Redis</span>
                        <Badge
                            variant={health?.redis ? "default" : "destructive"}
                        >
                            {health
                                ? health.redis
                                    ? "connected"
                                    : "error"
                                : "checking..."}
                        </Badge>
                    </div>
                    <div className="flex gap-2 pt-1">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                apiFetch<Health>("/health")
                                    .then(setHealth)
                                    .catch(() => {})
                            }
                        >
                            Refresh
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
