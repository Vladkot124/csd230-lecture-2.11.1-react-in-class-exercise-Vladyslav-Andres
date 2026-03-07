import { useState } from 'react'

function Book({ id, title, author, price, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(title)
    const [tempAuthor, setTempAuthor] = useState(author)
    const [tempPrice, setTempPrice] = useState(price)

    const handleSave = () => {
        const updatedBook = {
            id,
            title: tempTitle,
            author: tempAuthor,
            price: parseFloat(tempPrice),
            copies: 10
        }

        onUpdate(id, updatedBook)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div
                style={{
                    border: '2px solid #007bff',
                    margin: '10px 0',
                    padding: '15px',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '10px',
                    backgroundColor: '#eef',
                    alignItems: 'center'
                }}
            >
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} style={{ flex: 2 }} />
                <input type="text" value={tempAuthor} onChange={(e) => setTempAuthor(e.target.value)} style={{ flex: 2 }} />
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '100px' }} />
                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        )
    }

    return (
        <div
            style={{
                border: '1px solid #ccc',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f9f9f9'
            }}
        >
            <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Author:</strong> {author} | <strong>Price:</strong> ${Number(price).toFixed(2)}
                </p>
            </div>

            <div>
                <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
            </div>
        </div>
    )
}

export default Book