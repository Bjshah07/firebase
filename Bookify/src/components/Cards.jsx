import React from 'react'
import { useNavigate } from 'react-router-dom'
const Cards = (props) => {
    const navigate = useNavigate()
    return (
        <div className="card " style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">This book is add by {props.displayName} and the price is set to {props.price}
                    <br />
                    ISBN Number: {props.isbnNumber}
                    <br />
                    Contact: {props.email}
                </p>
                <img src={props.photoURL} alt="" height="50px" /><br />
                <button onClick={() => navigate(props.link)} className="btn btn-primary mt-2">{props.btn}</button>
            </div>
        </div>
    )
}

export default Cards