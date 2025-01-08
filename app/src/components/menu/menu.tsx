import { Link } from 'react-router-dom'
import './menu.css'

export default function Menu() {
    return <ul>
        <li>
            <Link to="/">
                Tarea actual
            </Link>
        </li>
        <li>
            <Link to="/assigned">
                Asignadas
            </Link>
        </li>
        <li>
            <Link to="/Issues">
                Issues
            </Link>
        </li>
    </ul>
}