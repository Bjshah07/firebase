import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cards = (props) => {
    const navigate = useNavigate()
    return (
        <div className="card h-100 shadow-sm border-0 hover-card" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
            <div className="card-body d-flex flex-column">
                <div className="text-center mb-3">
                    <img
                        src={props.photoURL}
                        alt="Book Cover"
                        className="img-fluid rounded"
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                </div>
                <h5 className="card-title fw-bold text-primary mb-3">{props.name}</h5>
                <div className="mb-3">
                    <p className="mb-2">
                        <i className="fas fa-user me-2 text-secondary"></i>
                        <strong>Added by:</strong> {props.displayName}
                    </p>
                    <p className="mb-2">
                        <i className="fas fa-dollar-sign me-2 text-success"></i>
                        <strong>Price:</strong> ${props.price}
                    </p>
                    <p className="mb-2">
                        <i className="fas fa-hashtag me-2 text-info"></i>
                        <strong>ISBN:</strong> {props.isbnNumber}
                    </p>
                    <p className="mb-2">
                        <i className="fas fa-envelope me-2 text-muted"></i>
                        <strong>Contact:</strong> {props.email}
                    </p>
                </div>
                <div className="mt-auto">
                    <button
                        onClick={() => navigate(props.link)}
                        className="btn btn-primary w-100"
                        style={{ transition: 'all 0.3s ease' }}
                    >
                        <i className="fas fa-eye me-2"></i>{props.btn}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cards