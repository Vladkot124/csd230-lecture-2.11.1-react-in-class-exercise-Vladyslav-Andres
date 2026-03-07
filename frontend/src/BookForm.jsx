import { useState } from 'react'

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()

        const newBook = {
            title,
            author,
            price: parseFloat(price),
            copies: 10
        }

        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        })
            .then(response => response.json())
            .then(savedBook => {
                alert('Book Saved!')
                onBookAdded(savedBook)
                setTitle('')
                setAuthor('')
                setPrice(0)
            })
    }

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid green', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Book</h3>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <button type="submit">Save Book</button>
        </form>
    )
}

export default BookForm