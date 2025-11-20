import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const ViewOrders = () => {
    const params = useParams()
    const { fetchOrders } = useFirebase()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders(params.bookId).then(snapshot => {
            setOrders(snapshot.docs)
        })
    }, [])
    return (
        <div className="container">
            <h2 className="mt-3">Orders for Book ID: {params.bookId}</h2>
            <div className="row">
                {orders.length === 0 ? <h3 className='mt-5'>There is no any orders</h3> : orders.map(
                    (order) => {
                        const data = order.data()
                        return (
                            <div className="col-4 mt-5 gap-2" key={order.id}>
                                <div className="card " style={{ width: '30rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Order ID: {order.id}</h5>
                                        <p>Ordered by: {data.displayName}</p>
                                        <p>Contact: {data.userEmail}</p>
                                        <p className="card-text">
                                            Quantity: {data.qty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default ViewOrders