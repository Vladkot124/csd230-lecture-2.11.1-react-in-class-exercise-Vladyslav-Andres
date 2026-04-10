import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import Laptop from './Laptop'
import LaptopForm from './LaptopForm'
import Navbar from './Navbar'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Cart from './pages/Cart'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './provider/authProvider'
import { useCart } from './provider/cartProvider'
import api from './api/axiosConfig'

function Home() {
    return (
        <div>
            <h1>Bookstore Admin Dashboard</h1>
            <p>Manage books, magazines, laptops, and customer carts.</p>
        </div>
    )
}

function ProtectedLayout({ children }) {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Navbar />
            {children}
        </div>
    )
}

function Catalog({ books, magazines, laptops }) {
    const { addToCart } = useCart()

    const normalized = [
        ...books.map((b) => ({
            key: `book-${b.id}`,
            name: b.title,
            price: b.price,
            type: 'Book'
        })),
        ...magazines.map((m) => ({
            key: `magazine-${m.id}`,
            name: m.title,
            price: m.price,
            type: 'Magazine'
        })),
        ...laptops.map((l) => ({
            key: `laptop-${l.id}`,
            name: `${l.brand} ${l.model}`,
            price: l.price,
            type: 'Laptop'
        }))
    ]

    return (
        <div>
            <h1>Catalog</h1>
            {normalized.map((item) => (
                <div
                    key={item.key}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '16px',
                        marginBottom: '12px'
                    }}
                >
                    <h3>{item.name}</h3>
                    <p>Type: {item.type}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            ))}
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
                                <h1>Book Inventory</h1>
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
                                    <h1>Add Book</h1>
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
                    path="/catalog"
                    element={
                        <ProtectedLayout>
                            <Catalog books={books} magazines={magazines} laptops={laptops} />
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedLayout>
                            <Cart />
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

export default <App></App>