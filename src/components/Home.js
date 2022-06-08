import React from 'react';
import "../style/Home.css";
import img from '../assets/images/car2.jpg'


const Home = () => {
    return (
        <div>
            <div>
            <p>If you are a user, please login and browse our wares!</p>
        <p>If not, please use the Register form in our navigation bar 
          to create your profile and get started!</p>
            </div>
        <img src={require('../assets/images/car2.jpg')} className='homepic' />
        </div>

    )
    
}

export default Home