import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useParams, useNavigate } from 'react-router-dom'

const BookDetail = () => {
    const { getBookDetail, placeOrder, isLoggedIn } = useFirebase()
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [qty, setQty] = useState(1)

    useEffect(() => {
        getBookDetail(params.id).then((book) => setData(book.data()))
    }, [])

    if (data == null) return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    const handlePlaceOrder = () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        return placeOrder(params.id, qty).then(() => alert("Order placed successfully"))
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <img
                                src={data.photoURL}
                                alt="Book Cover"
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                            <h5 className="card-title text-muted">Added by: {data.displayName}</h5>
                            <p className="card-text"><i className="fas fa-envelope me-2"></i>{data.email}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 h-100">
                        <div className="card-body d-flex flex-column">
                            <h1 className="card-title mb-3">{data.name}</h1>
                            <div className="mb-3">
                                <p className="mb-2"><i className="fas fa-hashtag me-2 text-primary"></i><strong>ISBN:</strong> {data.isbnNumber}</p>
                                <p className="mb-2"><i className="fas fa-dollar-sign me-2 text-success"></i><strong>Price:</strong> ${data.price}</p>
                            </div>
                            <div className="mt-auto">
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label fw-bold">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        id="quantity"
                                        value={qty}
                                        onChange={e => setQty(e.target.value)}
                                        min="1"
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={handlePlaceOrder}
                                    style={{ transition: 'all 0.3s ease' }}
                                >
                                    <i className="fas fa-shopping-cart me-2"></i>Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail