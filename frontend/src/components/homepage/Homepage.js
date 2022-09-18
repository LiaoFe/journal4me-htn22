import React from 'react';
import "./homepage.css";
import play from './play.svg';
import grass from './grass.jpg';
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div className="container-home">
            
                <Link to='/'>homepage</Link>
                <Link to='/entries'>entries</Link>
                <Link to='/recordnow'>record now</Link>
            <div className="title">
                welcome back
            </div>
            <div className="bottom-btn">
                <button>
                    <img src={play} alt="Play Button" height='50' width={'150'}/>
                </button>
            </div>
            <div className="waves">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
}

export default HomePage;