import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MagazineForm({ onMagazineSaved }) {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [orderQty, setOrderQty] = useState('')
    const [currentIssue, setCurrentIssue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim() || !price.trim() || !orderQty.trim() || !currentIssue.trim()) {
            alert('Fill all fields')
            return
        }

        const newMagazine = {
            title: title.trim(),
            price: price.trim(),
            orderQty: orderQty.trim(),
            currentIssue: `${currentIssue}T00:00:00`,
            copies: 1
        }

        console.log('POST payload:', newMagazine)

        try {
            const response = await fetch('/api/magazines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMagazine)
            })

            const text = await response.text()
            console.log('POST response:', text)

            if (!response.ok) {
                throw new Error(text)
            }

            await onMagazineSaved()
            navigate('/magazines')
        } catch (error) {
            console.error('Save magazine error:', error)
            alert('Error saving magazine')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid purple', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Magazine</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            <input
                type="number"
                placeholder="Order Qty"
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <input
                type="date"
                value={currentIssue}
                onChange={(e) => setCurrentIssue(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <button type="submit">Save Magazine</button>
        </form>
    )
}

export default MagazineForm