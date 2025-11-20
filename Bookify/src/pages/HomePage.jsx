import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import Cards from '../components/Cards'

const HomePage = () => {
    const { listBooks } = useFirebase()
    const [books, setBooks] = useState([])

    useEffect(() => {
        listBooks().then((books) => {
            setBooks(books.docs)
        })
    }, [])

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-3">Welcome to Bookify</h1>
                            <p className="lead mb-4">
                                Discover, buy, and sell books in our vibrant community.
                                Find your next favorite read or share your collection with fellow book lovers.
                            </p>
                            <button className="btn btn-light btn-lg">Explore Books</button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Books"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: '400px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Books Section */}
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mb-4">Available Books</h2>
                        <p className="text-center text-muted mb-5">
                            Browse through our collection of books from various sellers
                        </p>
                    </div>
                </div>
                <div className="row g-4">
                    {books.map((book) => (
                        <div className="col-lg-4 col-md-6" key={book.id}>
                            <Cards
                                link={`/books/view/${book.id}`}
                                id={book.id}
                                {...book.data()}
                                btn="View Details"
                            />
                        </div>
                    ))}
                </div>
                {books.length === 0 && (
                    <div className="text-center py-5">
                        <h3 className="text-muted">No books available yet</h3>
                        <p className="text-muted">Check back later or add your own books!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage