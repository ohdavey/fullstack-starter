/// <reference types="vite/client" />

const BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export function getToken(): string | null {
    return localStorage.getItem('api_token')
}

export function setToken(token: string): void {
    localStorage.setItem('api_token', token)
}

export function clearToken(): void {
    localStorage.removeItem('api_token')
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const token = getToken()

    const res = await fetch(`${BASE}/api${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options?.headers ?? {}),
        },
    })

    if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(body.error ?? 'Request failed')
    }

    return res.json()
}