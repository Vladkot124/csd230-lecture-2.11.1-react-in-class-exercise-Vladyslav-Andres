import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import api from '../api/axiosConfig'

function Login() {
    const { setToken } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const isExpired = queryParams.get('expired') === 'true'

    const [email, setEmail] = useState('admin@admin.com')
    const [password, setPassword] = useState('admin')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const response = await api.post('/auth/login', { email, password })
            const token = response.data.token || response.data.accessToken || response.data.jwt

            if (!token) {
                throw new Error('No token returned from server')
            }

            setToken(token)
            navigate('/', { replace: true })
        } catch (err) {
            console.error(err)
            setError('Invalid credentials. Please try again.')
        }
    }

    return (
        <div style={{ maxWidth: '420px', margin: '60px auto', padding: '24px', border: '1px solid #ddd', borderRadius: '12px' }}>
            <h2 style={{ textAlign: 'center' }}>Sign In to Bookstore Admin</h2>

            {isExpired && (
                <div
                    style={{
                        backgroundColor: '#ffe08a',
                        color: '#222',
                        padding: '12px',
                        marginBottom: '20px',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    Session expired. Please log in again.
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '12px' }}>
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    Login
                </button>
            </form>

            <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                Demo admin: admin@admin.com / admin
            </p>
        </div>
    )
}

export default Login