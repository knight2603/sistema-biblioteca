import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Sistema de Biblioteca</h2>

            <ul className="navbar-links">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/books">Libros</Link>
                </li>

                <li>
                    <Link to="/users">Usuarios</Link>
                </li>

                <li>
                    <Link to="/loans">Préstamos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar