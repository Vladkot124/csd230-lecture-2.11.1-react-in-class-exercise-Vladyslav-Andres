import { useState } from 'react'
import { useAuth } from './provider/authProvider'
import api from './api/axiosConfig'

function Laptop({ laptop, onLaptopUpdated, onLaptopDeleted }) {
    const { isAdmin } = useAuth()

    const [isEditing, setIsEditing] = useState(false)
    const [tempBrand, setTempBrand] = useState(laptop?.brand ?? '')
    const [tempModel, setTempModel] = useState(laptop?.model ?? '')
    const [tempPrice, setTempPrice] = useState(
        laptop?.price !== undefined && laptop?.price !== null ? String(laptop.price) : ''
    )
    const [tempStock, setTempStock] = useState(
        laptop?.stock !== undefined && laptop?.stock !== null ? String(laptop.stock) : ''
    )

    const handleSave = async () => {
        if (!tempBrand.trim() || !tempModel.trim() || !tempPrice.trim() || !tempStock.trim()) {
            alert('Fill all fields')
            return
        }

        const updatedLaptop = {
            id: laptop.id,
            brand: tempBrand.trim(),
            model: tempModel.trim(),
            price: Number(tempPrice),
            stock: Number(tempStock)
        }

        try {
            await api.put(`/laptops/${laptop.id}`, updatedLaptop)
            if (onLaptopUpdated) {
                await onLaptopUpdated()
            }
            setIsEditing(false)
        } catch (error) {
            console.error('Update laptop error:', error)
            alert('Error updating laptop')
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/laptops/${laptop.id}`)
            if (onLaptopDeleted) {
                await onLaptopDeleted()
            }
        } catch (error) {
            console.error('Delete laptop error:', error)
            alert('Error deleting laptop')
        }
    }

    if (!laptop) {
        return null
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
                <input
                    type="text"
                    value={tempBrand}
                    onChange={(e) => setTempBrand(e.target.value)}
                    placeholder="Brand"
                />
                <input
                    type="text"
                    value={tempModel}
                    onChange={(e) => setTempModel(e.target.value)}
                    placeholder="Model"
                />
                <input
                    type="number"
                    step="0.01"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    type="number"
                    value={tempStock}
                    onChange={(e) => setTempStock(e.target.value)}
                    placeholder="Stock"
                />
                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>
                    Save
                </button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>
                    Cancel
                </button>
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
                <h3 style={{ margin: '0 0 5px 0' }}>
                    {(laptop.brand ?? 'Unknown Brand')} {(laptop.model ?? 'Unknown Model')}
                </h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${Number(laptop.price ?? 0).toFixed(2)} | <strong>Stock:</strong> {laptop.stock ?? 0}
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

export default Laptop