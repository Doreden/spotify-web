import { Link } from "react-router-dom"

export function Navigation(){
    return (
        <>
            <div className="navigation">
                <ul className="nav-buttons">
                    <li className="nav-button">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-button">
                        <Link to="/search">Search</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}