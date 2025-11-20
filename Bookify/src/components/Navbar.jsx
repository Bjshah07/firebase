import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const Navbar = () => {
    const { isLoggedIn, logout } = useFirebase()

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Bookify</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/add-books">Add Books</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/books/orders">Orders</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar