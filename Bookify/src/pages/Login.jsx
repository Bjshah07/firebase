import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const { login, isLoggedIn } = useFirebase()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <form className="container mt-5" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    )
}

export default Login