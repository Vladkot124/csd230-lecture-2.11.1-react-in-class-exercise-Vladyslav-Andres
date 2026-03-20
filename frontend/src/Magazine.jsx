import { useState } from 'react'
import { useAuth } from './provider/authProvider'

function Magazine({ magazine, onMagazineUpdated, onMagazineDeleted }) {
    const { isAdmin } = useAuth()

    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(magazine.title ?? '')
    const [tempPrice, setTempPrice] = useState(String(magazine.price ?? ''))
    const [tempOrderQty, setTempOrderQty] = useState(String(magazine.orderQty ?? ''))
    const [tempCurrentIssue, setTempCurrentIssue] = useState(
        magazine.currentIssue ? magazine.currentIssue.split('T')[0] : ''
    )

    const handleSave = async () => {
        if (!tempTitle.trim() || !tempPrice.trim() || !tempOrderQty.trim() || !tempCurrentIssue.trim()) {
            alert('Fill all fields')
            return
        }

        const updatedMagazine = {
            id: magazine.id,
            title: tempTitle.trim(),
            price: tempPrice.trim(),
            orderQty: tempOrderQty.trim(),
            currentIssue: `${tempCurrentIssue}T00:00:00`,
            copies: magazine.copies
        }

        try {
            const response = await fetch(`/api/magazines/${magazine.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMagazine)
            })

            const text = await response.text()

            if (!response.ok) {
                throw new Error(text)
            }

            await onMagazineUpdated()
            setIsEditing(false)
        } catch (error) {
            console.error('Update magazine error:', error)
            alert('Error updating magazine')
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/magazines/${magazine.id}`, {
                method: 'DELETE'
            })

            const text = await response.text()

            if (!response.ok) {
                throw new Error(text)
            }

            await onMagazineDeleted()
        } catch (error) {
            console.error('Delete magazine error:', error)
            alert('Error deleting magazine')
        }
    }

    if (isEditing) {
        return (
            <div
                style={{
                    border: '2px solid #4444ff',
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
                <input type="number" step="0.01" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '100px' }} />
                <input type="number" value={tempOrderQty} onChange={(e) => setTempOrderQty(e.target.value)} style={{ width: '100px' }} />
                <input type="date" value={tempCurrentIssue} onChange={(e) => setTempCurrentIssue(e.target.value)} />
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
                <h3 style={{ margin: '0 0 5px 0' }}>{magazine.title}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${Number(magazine.price).toFixed(2)} | <strong>Order Qty:</strong> {magazine.orderQty} | <strong>Current Issue:</strong> {magazine.currentIssue ? magazine.currentIssue.split('T')[0] : ''}
                </p>
            </div>

            {isAdmin && (
                <div>
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ backgroundColor: '#ffc107', marginRight: '5px' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{ backgroundColor: '#ff4444', color: 'white' }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default Magazine