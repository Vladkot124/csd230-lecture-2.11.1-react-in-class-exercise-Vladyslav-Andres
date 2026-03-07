import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/inventory" style={{ marginRight: '15px' }}>Books</Link>
            <Link to="/add" style={{ marginRight: '15px' }}>Add Book</Link>
            <Link to="/magazines" style={{ marginRight: '15px' }}>Magazines</Link>
            <Link to="/add-magazine">Add Magazine</Link>
        </nav>
    )
}

export default Navbar