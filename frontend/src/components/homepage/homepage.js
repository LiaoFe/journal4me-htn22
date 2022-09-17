import React from 'react';
import "./homepage.css";
import play from './play.svg';


function HomePage() {
    return (
        <div className="container">
            <div className="header">
                <a href="./homepage.js">journal log</a>
                <a href="./homepage.js">account</a>
                <a href="./homepage.js">calendar</a>
            </div>
            <div className="title">
                welcome back
            </div>
            <div className="bottom-btn">
                <button>
                    <img src={play} alt="Play Button" height='50'/>
                </button>
            </div>
        </div>
    );
}

export default HomePage;