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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Sign In to Bookstore Admin</h2>

            {isExpired && (
                <div
                    style={{
                        backgroundColor: 'orange',
                        color: 'black',
                        padding: '12px',
                        margin: '0 auto 20px auto',
                        width: '320px',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    Session expired. Please log in again.
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={{ width: '100%' }}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login