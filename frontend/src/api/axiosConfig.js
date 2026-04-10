import axios from 'axios'

const api = axios.create({
    baseURL: ' https://csd230-lecture-2-11-1-react-in-class-we0x.onrender.com/'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status

        if (status === 401 || status === 403) {
            localStorage.removeItem('token')
            window.location.href = '/login?expired=true'
        }

        return Promise.reject(error)
    }
)

export default api