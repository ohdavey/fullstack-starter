import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { apiFetch, setToken, clearToken } from "./api";

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

type AuthResponse = { data: { token: string; user: AuthUser } };
type MeResponse = { data: AuthUser };

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = createAuthState();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function createAuthState() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch<MeResponse>("/me")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await apiFetch<AuthResponse>("/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        setToken(res.data.token);
        setUser(res.data.user);
    }, []);

    const register = useCallback(
        async (
            name: string,
            email: string,
            password: string,
            passwordConfirmation: string,
        ) => {
            const res = await apiFetch<AuthResponse>("/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });
            setToken(res.data.token);
            setUser(res.data.user);
        },
        [],
    );

    const logout = useCallback(async () => {
        console.log("Logging out");
        try {
            await apiFetch("/logout", { method: "POST" });
        } finally {
            clearToken();
            setUser(null);
        }
    }, []);

    return { user, loading, login, register, logout };
}
