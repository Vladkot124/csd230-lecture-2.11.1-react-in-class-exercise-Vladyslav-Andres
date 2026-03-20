import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/axiosConfig'
import { useAuth } from './provider/authProvider'

function LaptopForm({ onLaptopSaved }) {
    const { isAdmin } = useAuth()
    const navigate = useNavigate()

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')

    if (!isAdmin) {
        return <h2>Access Denied</h2>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!brand.trim() || !model.trim() || !price.trim() || !stock.trim()) {
            alert('Fill all fields')
            return
        }

        const newLaptop = {
            brand: brand.trim(),
            model: model.trim(),
            price: Number(price),
            stock: Number(stock)
        }

        try {
            await api.post('/laptops', newLaptop)
            if (onLaptopSaved) {
                await onLaptopSaved()
            }
            navigate('/laptops')
        } catch (error) {
            console.error('Save laptop error:', error)
            alert('Error saving laptop')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid teal', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Laptop</h3>

            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
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
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />

            <button type="submit">Save Laptop</button>
        </form>
    )
}

export default LaptopForm