import { Link } from 'react-router-dom'
import { useAuth } from './provider/authProvider'
import { useCart } from './provider/cartProvider'

function Navbar() {
    const { isAdmin } = useAuth()
    const { totalItems } = useCart()

    return (
        <nav
            style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                padding: '16px 0',
                borderBottom: '1px solid #ddd',
                marginBottom: '20px'
            }}
        >
            <Link to="/">Home</Link>
            <Link to="/inventory">Books</Link>
            <Link to="/magazines">Magazines</Link>
            <Link to="/laptops">Laptops</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart ({totalItems})</Link>

            {isAdmin && (
                <>
                    <Link to="/add">Add Book</Link>
                    <Link to="/add-laptop">Add Laptop</Link>
                </>
            )}

            <Link to="/logout">Logout</Link>
        </nav>
    )
}

export default Navbar