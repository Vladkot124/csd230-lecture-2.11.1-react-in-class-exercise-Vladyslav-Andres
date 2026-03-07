import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Navbar from './Navbar'

function Home() {
    return (
        <div>
            <h1>Bookstore Home</h1>
            <p>Select a section from the navigation bar.</p>
        </div>
    )
}

function App() {
    const [books, setBooks] = useState([])
    const [magazines, setMagazines] = useState([])
    const [loading, setLoading] = useState(true)

    const loadBooks = async () => {
        const response = await fetch('/api/books')
        const data = await response.json()
        setBooks(data)
    }

    const loadMagazines = async () => {
        const response = await fetch('/api/magazines')
        const data = await response.json()
        setMagazines(data)
    }

    const loadAll = async () => {
        try {
            setLoading(true)
            await Promise.all([loadBooks(), loadMagazines()])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAll()
    }, [])

    const handleAddBook = (newlySavedBook) => {
        setBooks([...books, newlySavedBook])
    }

    const handleDeleteBook = async (id) => {
        const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            setBooks(books.filter((b) => b.id !== id))
        }
    }

    const handleUpdateBook = async (id, updatedData) => {
        const response = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })

        const savedBook = await response.json()
        setBooks(books.map((b) => (b.id === id ? savedBook : b)))
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/inventory"
                    element={
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
                    }
                />

                <Route
                    path="/add"
                    element={
                        <div>
                            <h1>Add to Library</h1>
                            <BookForm onBookAdded={handleAddBook} />
                        </div>
                    }
                />

                <Route
                    path="/magazines"
                    element={
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
                    }
                />

                <Route
                    path="/add-magazine"
                    element={
                        <div>
                            <h1>Add Magazine</h1>
                            <MagazineForm onMagazineSaved={loadMagazines} />
                        </div>
                    }
                />

                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
    )
}

export default App