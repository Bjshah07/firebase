import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import Cards from '../components/Cards'

const Orders = () => {
    const { fetchBooks, user } = useFirebase()
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (user) {
            fetchBooks(user.uid).then(snapshot => setBooks(snapshot.docs))
        }
    }, [user])

    if (!user) return <div className="container"><h2>Please log in to view your orders.</h2></div>

    return (
        <div className="container">
            <div className="row">
                {books.map(
                    (book) => {
                        return (
                            <div className="col-4 mt-5" key={book.id}>
                                <Cards link={`/books/orders/${book.id}`} id={book.id} {...book.data()} btn="View Orders"/>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Orders
