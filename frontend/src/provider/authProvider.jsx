import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext()

const decodeRolesFromToken = (token) => {
    if (!token) return []

    try {
        const payloadBase64 = token.split('.')[1]
        const payloadJson = atob(payloadBase64)
        const payload = JSON.parse(payloadJson)

        if (Array.isArray(payload.roles)) return payload.roles
        if (Array.isArray(payload.authorities)) return payload.authorities
        if (typeof payload.role === 'string') return [payload.role]

        return []
    } catch (error) {
        console.error('Failed to decode token:', error)
        return []
    }
}

function AuthProvider({ children }) {
    const [token, setTokenState] = useState(localStorage.getItem('token'))

    const setToken = (newToken) => {
        setTokenState(newToken)

        if (newToken) {
            localStorage.setItem('token', newToken)
        } else {
            localStorage.removeItem('token')
        }
    }

    const roles = useMemo(() => decodeRolesFromToken(token), [token])

    const value = useMemo(() => {
        return {
            token,
            roles,
            isLoggedIn: !!token,
            isAdmin: roles.includes('ROLE_ADMIN'),
            setToken,
            logout: () => setToken(null),
        }
    }, [token, roles])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider