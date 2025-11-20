import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase'

const AddBooks = () => {
    const [name, setName] = useState('')
    const [isbnNumber, setIsbnNumber] = useState('')
    const [price, setPrice] = useState('')

    const { handleAddBook } = useFirebase()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAddBook(name, isbnNumber, price).then(() => alert("Book added successfully"))
    }

    return (
        <form className="container mt-5" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name of the book</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">ISBN Number</label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={isbnNumber}
                    onChange={e => setIsbnNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword2"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary" >Add</button>
        </form>
    )
}

export default AddBooks