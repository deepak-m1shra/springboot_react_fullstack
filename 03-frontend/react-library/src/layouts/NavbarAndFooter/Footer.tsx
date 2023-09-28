import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color'>
                <p className='col-md-4 mb-0 text-white'>© Example Library App, Inc</p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <Link to='/home' className='nav-link px-2 text-white'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/search' className='nav-link px-2 text-white'>
                            Search Books
                        </Link>
                    </li>
                </ul>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16" style={{ color: "gold" }}>
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            </footer>
        </div>
    );
}