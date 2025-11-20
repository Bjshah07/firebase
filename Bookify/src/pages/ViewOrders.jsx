import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const ViewOrders = () => {
    const params = useParams()
    const { fetchOrders } = useFirebase()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders(params.bookId).then(snapshot => {
            setOrders(snapshot.docs)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h2 className="display-4 fw-bold text-primary">
                    <i className="fas fa-shopping-bag me-3"></i>Orders for Book ID: {params.bookId}
                </h2>
                <p className="text-muted">View all orders placed for this book</p>
            </div>
            {orders.length === 0 ? (
                <div className="text-center mt-5">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h3 className="text-muted">No orders found</h3>
                    <p className="text-muted">There are no orders for this book yet.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {orders.map((order) => {
                        const data = order.data()
                        return (
                            <div className="col-lg-4 col-md-6" key={order.id}>
                                <div className="card h-100 shadow-sm border-0 hover-shadow">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fas fa-receipt text-primary me-2"></i>
                                            <h5 className="card-title mb-0">Order #{order.id.slice(-8)}</h5>
                                        </div>
                                        <div className="mb-2">
                                            <i className="fas fa-user me-2 text-secondary"></i>
                                            <strong>Ordered by:</strong> {data.displayName}
                                        </div>
                                        <div className="mb-2">
                                            <i className="fas fa-envelope me-2 text-secondary"></i>
                                            <strong>Contact:</strong> {data.userEmail}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-boxes me-2 text-success"></i>
                                            <span className="badge bg-success fs-6">Quantity: {data.qty}</span>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-light border-0">
                                        <small className="text-muted">
                                            <i className="fas fa-clock me-1"></i>Order placed
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ViewOrders