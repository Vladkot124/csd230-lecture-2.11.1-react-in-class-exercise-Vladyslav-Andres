import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Laptop from './Laptop'
import LaptopForm from './LaptopForm'
import Navbar from './Navbar'
import Login from './pages/Login'
import Logout from './pages/Logout'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './provider/authProvider'
import api from './api/axiosConfig'

function Home() {
    return (
        <div>
            <h1>Bookstore Home</h1>
            <p>Select a section from the navigation bar.</p>
        </div>
    )
}

function ProtectedLayout({ children }) {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <Navbar />
            {children}
        </div>
    )
}

function App() {
    const { token, isAdmin } = useAuth()

    const [books, setBooks] = useState([])
    const [magazines, setMagazines] = useState([])
    const [laptops, setLaptops] = useState([])
    const [loading, setLoading] = useState(true)

    const loadBooks = async () => {
        const response = await api.get('/books')
        setBooks(response.data)
    }

    const loadMagazines = async () => {
        const response = await api.get('/magazines')
        setMagazines(response.data)
    }

    const loadLaptops = async () => {
        const response = await api.get('/laptops')
        setLaptops(response.data)
    }

    const loadAll = async () => {
        try {
            setLoading(true)
            await Promise.all([loadBooks(), loadMagazines(), loadLaptops()])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            loadAll()
        } else {
            setLoading(false)
            setBooks([])
            setMagazines([])
            setLaptops([])
        }
    }, [token])

    const handleAddBook = (newlySavedBook) => {
        setBooks([...books, newlySavedBook])
    }

    const handleDeleteBook = async (id) => {
        const response = await api.delete(`/books/${id}`)
        if (response.status === 200) {
            setBooks(books.filter((b) => b.id !== id))
        }
    }

    const handleUpdateBook = async (id, updatedData) => {
        const response = await api.put(`/books/${id}`, updatedData)
        const savedBook = response.data
        setBooks(books.map((b) => (b.id === id ? savedBook : b)))
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={
                        <ProtectedLayout>
                            <Home />
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/inventory"
                    element={
                        <ProtectedLayout>
                            <div>
                                <h1>Current Inventory</h1>
                                {loading ? (
                                    <h2>Loading...</h2>
                                ) : (
                                    books.map((b) => (
                                        <Book
                                            key={b.id}
                                            {...b}
                                            onDelete={handleDeleteBook}
                                            onUpdate={handleUpdateBook}
                                        />
                                    ))
                                )}
                            </div>
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/add"
                    element={
                        <ProtectedLayout>
                            {isAdmin ? (
                                <div>
                                    <h1>Add to Library</h1>
                                    <BookForm onBookAdded={handleAddBook} />
                                </div>
                            ) : (
                                <h2>Access Denied</h2>
                            )}
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/magazines"
                    element={
                        <ProtectedLayout>
                            <div>
                                <h1>Magazine Inventory</h1>
                                {loading ? (
                                    <h2>Loading...</h2>
                                ) : (
                                    magazines.map((m) => (
                                        <Magazine
                                            key={m.id}
                                            magazine={m}
                                            onMagazineUpdated={loadMagazines}
                                            onMagazineDeleted={loadMagazines}
                                        />
                                    ))
                                )}
                            </div>
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/laptops"
                    element={
                        <ProtectedLayout>
                            <div>
                                <h1>Laptop Inventory</h1>
                                {loading ? (
                                    <h2>Loading...</h2>
                                ) : (
                                    laptops.map((l) => (
                                        <Laptop
                                            key={l.id}
                                            laptop={l}
                                            onLaptopUpdated={loadLaptops}
                                            onLaptopDeleted={loadLaptops}
                                        />
                                    ))
                                )}
                            </div>
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/add-laptop"
                    element={
                        <ProtectedLayout>
                            {isAdmin ? (
                                <div>
                                    <h1>Add Laptop</h1>
                                    <LaptopForm onLaptopSaved={loadLaptops} />
                                </div>
                            ) : (
                                <h2>Access Denied</h2>
                            )}
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/add-laptop"
                    element={
                        <ProtectedLayout>
                            {isAdmin ? (
                                <div>
                                    <h1>Add Laptop</h1>
                                    <LaptopForm onLaptopSaved={loadLaptops} />
                                </div>
                            ) : (
                                <h2>Access Denied</h2>
                            )}
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="*"
                    element={
                        <ProtectedLayout>
                            <h2>Page Not Found</h2>
                        </ProtectedLayout>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App