import { Link } from 'react-router-dom'
import { useAuth } from './provider/authProvider'

function Navbar() {
    const { isAdmin } = useAuth()

    return (
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/inventory" style={{ marginRight: '15px' }}>Books</Link>
            <Link to="/magazines" style={{ marginRight: '15px' }}>Magazines</Link>
            <Link to="/laptops" style={{ marginRight: '15px' }}>Laptops</Link>

            {isAdmin && (
                <>
                    <Link to="/add" style={{ marginRight: '15px' }}>Add Book</Link>
                    <Link to="/add-magazine" style={{ marginRight: '15px' }}>Add Magazine</Link>
                    <Link to="/add-laptop" style={{ marginRight: '15px' }}>Add Laptop</Link>
                </>
            )}

            <Link to="/logout">Logout</Link>
        </nav>
    )
}

export default Navbar