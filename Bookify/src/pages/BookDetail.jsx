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

    if (data == null) return <div>Loading...</div>

    const handlePlaceOrder = () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        return placeOrder(params.id, qty).then(() => alert("Order placed successfully"))
    }
    return (
        <div className='container'>
            <h1>{data.name}</h1>
            <p>ISBN Number: {data.isbnNumber}</p>
            <p>Price: {data.price}</p>
            <h2>Added by:</h2>
            <p>Name: {data.displayName}</p>
            <p>Contact: {data.email}</p>
            <img src={data.photoURL} alt="" height="100px" /><br />
            <div className="mt-3 w-50" >
                <label htmlFor="exampleInputEmail1" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
            </div>
            <button className='btn btn-success mt-3' onClick={handlePlaceOrder}>Buy now</button>
        </div>
    )
}

export default BookDetail