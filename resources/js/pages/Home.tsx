import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <div className="flex gap-3">
                <Button asChild>
                    <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/register">Create account</Link>
                </Button>
            </div>
        </div>
    );
}
